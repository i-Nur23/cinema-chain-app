import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AcceptActionDialog} from "../Dialogs";
import {ActorDirectorElement} from "../ListElements/ActorDirectorElement";
import {ArrowUturnLeftIcon, PencilIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {FilmsAPI} from "../../api";

export const ActorsPanel = () => {
  const navigate = useNavigate();

  const [actors, setActors] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredActors, setFilteredActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [newActorName, setNewActorName] = useState('');
  const [newActorSurname, setNewActorSurname] = useState('');
  const token = useSelector(state => state.auth.token);

  const close = () => setOpen(false);

  useEffect(() => {
    (
      async () => {
        try {
          const resData = await FilmsAPI.getAllActors(token);
          setActors(resData.actorsList);
          setFilteredActors(resData.actorsList);
          setLoaded(true)
        } catch (err) {
          navigate('/staff')
        }
      }
    )()
  },[])

  const handleAdding = () => {
    FilmsAPI.createNewActor(newActorName, token)
      .then(_ => FilmsAPI.getAllActors(token)
        .then(resData => {
          setNewActorName("");
          setActors(resData.actorsList)
          setFilteredActors(resData.actorsList.filter(actor => actor.name.toLowerCase().indexOf(search.toLowerCase()) != -1))
        }))
  }

  return loaded && (
    <div>
      <div className='w-full flex px-5 gap-3 text-center'>
        <p className='font-light my-auto'>Поиск: </p>
        <input
          className='w-full p-3 border rounded-lg focus:outline-none'
          placeholder={"Введите имя"}
          value={search}
          onChange={async e => {
            setSearch(e.target.value);
            setFilteredActors(actors.filter(actor => actor.name.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1))
          }}
        />
      </div>
      <ul>
        {
          filteredActors.map(actor =>
            <ActorDirectorElement
              key={actor.id}
              onDelete={() => {
                  setSelectedActor(actor);
                  setOpen(true);
                }
              }

              onSave={(name) => {
                  FilmsAPI.editActor(actor.id, name, token)
                    .then(_ => FilmsAPI.getAllActors(token)
                      .then(resData => {
                        setActors(resData.actorsList);
                        setFilteredActors(resData.actorsList.filter(actor => actor.name.toLowerCase().indexOf(search.toLowerCase()) != -1))
                      }))
                }
              }

              name={actor.name}
            />
          )
        }
        <li className="p-3 border-b">
          <div className='flex justify-between'>
            <div className='flex gap-3'>
              <p className='p-2'>
                Новый актер:
              </p>
              <input
                className='p-2 border rounded-lg focus:outline-none'
                value={newActorName}
                onChange={e => setNewActorName(e.target.value)}
                placeholder={'Имя'}
              />
            </div>
            <button className='bg-cyan-700 rounded-lg px-3 py-2 text-white' onClick={handleAdding}>
              Добавить
            </button>
          </div>
        </li>
      </ul>
      <AcceptActionDialog
        isOpen={open}
        close={() => close()}
        message={`Вы уверены, что ходите удалить из системы актера: ${selectedActor?.name}?`}
        action={() => {
          FilmsAPI.deleteActor(selectedActor.id, token)
            .then(_ => FilmsAPI.getAllActors(token)
              .then(resData => {
                setActors(resData.actorsList);
                setFilteredActors(resData.actorsList.filter(actor => actor.name.toLowerCase().indexOf(search.toLowerCase()) != -1))
                close()
              }));
        }}
      />
    </div>
  )
}