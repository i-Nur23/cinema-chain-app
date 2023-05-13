import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ActorDirectorElement} from "../ListElements/ActorDirectorElement";
import {AcceptActionDialog} from "../Dialogs";
import {FilmsAPI} from "../../api";

export const DirectorsPanel = () => {
  const navigate = useNavigate();

  const [directors, setDirectors] = useState([]);
  const [filteredDirectors, setFilteredDirectors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [newDirectorName, setNewDirectorName] = useState('');
  const token = useSelector(state => state.auth.token);

  const close = () => setOpen(false);

  useEffect(() => {
    (
      async () => {
        try {
          const resData = await FilmsAPI.getAllDirectors(token);
          setDirectors(resData.filmDirectorList);
          setFilteredDirectors(resData.filmDirectorList);
          setLoaded(true);
        } catch (err) {
          navigate('/staff')
        }
      }
    )()
  },[])

  const handleAdding = () => {
    FilmsAPI.createNewDirector(newDirectorName, token)
      .then(_ => FilmsAPI.getAllDirectors(token)
        .then(resData => {
          setNewDirectorName("");
          setDirectors(resData.filmDirectorList);
          setFilteredDirectors(resData.filmDirectorList.filter(director => director.name.toLowerCase().indexOf(search.toLowerCase()) != -1))
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
            setFilteredDirectors(directors.filter(director => director.name.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1))
          }}
        />
      </div>
      <ul>
        {
         filteredDirectors.map(director =>
            <ActorDirectorElement
              key={director.id}
              onDelete={() => {
                setSelectedDirector(director);
                setOpen(true);
              }
              }

              onSave={(name) => {
                FilmsAPI.editDirector(director.id, name, token)
                  .then(_ => FilmsAPI.getAllDirectors(token)
                    .then(resData => {
                      setDirectors(resData.filmDirectorList);
                      setFilteredDirectors(resData.filmDirectorList.filter(director => director.name.toLowerCase().indexOf(search.toLowerCase()) != -1))
                    }))
                }
              }

              name = {director.name}
            />
          )
        }
        <li className="p-3 border-b">
          <div className='flex justify-between'>
            <div className='flex gap-3'>
              <p className='p-2'>
                Новый режиссер:
              </p>
              <input
                className='p-2 border rounded-lg focus:outline-none'
                value={newDirectorName}
                onChange={e => setNewDirectorName(e.target.value)}
                placeholder={'Имя'}
              />
            </div>
            <button
              className='bg-cyan-700 rounded-lg px-3 py-2 text-white'
              onClick={handleAdding}>
              Добавить
            </button>
          </div>
        </li>
      </ul>
      <AcceptActionDialog
        isOpen={open}
        close={() => close()}
        message={`Вы уверены, что ходите удалить из системы режиссера: ${selectedDirector?.name}?`}
        action={() => {
          FilmsAPI.deleteDirector(selectedDirector.id, token)
            .then(_ => FilmsAPI.getAllDirectors(token)
              .then(resData => {
                setDirectors(resData.filmDirectorList);
                setFilteredDirectors(resData.filmDirectorList.filter(director => director.name.toLowerCase().indexOf(search.toLowerCase()) != -1))
                close()
              }));
        }}
      />
    </div>
  )
}