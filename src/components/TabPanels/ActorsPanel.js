import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AcceptActionDialog} from "../Dialogs";
import {ActorDirectorElement} from "../ListElements/ActorDirectorElement";
import {ArrowUturnLeftIcon, PencilIcon, XMarkIcon} from "@heroicons/react/24/outline";

export const ActorsPanel = () => {
  const navigate = useNavigate();

  const [actors, setActors] = useState([
    {
      firstName : "Райан",
      lastName : "Гослинг"
    },
    {
      firstName : "Кристиан",
      lastName : "Бейл"
    }
  ]);
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
          /*const resData = await ActorsAPI.GetAllActors(token);
          setActors(resData.actorList);*/
          setLoaded(true)
        } catch (err) {
          navigate('/staff')
        }
      }
    )()
  },[])

  const changeActivity = async () => {

  }

  return loaded && (
    <div>
      <ul>
        {
          actors.map(actor =>
            <ActorDirectorElement
              onDelete={(id) => {

                setSelectedActor(actor);
                setOpen(true);
              }
              }

              onSave={(id, firstName, lastName) => {
                setSelectedActor(actor);
              }
              }

              firstName={actor.firstName}
              lastName={actor.lastName}
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
              <input
                className='p-2 border rounded-lg focus:outline-none'
                value={newActorSurname}
                onChange={e => setNewActorSurname(e.target.value)}
                placeholder={'Фамилия'}
              />
            </div>
            <button className='bg-cyan-700 rounded-lg px-3 py-2 text-white'>
              Добавить
            </button>
          </div>
        </li>
      </ul>
      <AcceptActionDialog
        isOpen={open}
        close={() => close()}
        message={`Вы уверены, что ходите удалить из системы актера: ${selectedActor?.firstName}  ${selectedActor?.lastName}?`}
        action={() => {
          /*ActorAPI.RemoveActor(deletingActor.id, token)
            .then(_ => ActorAPI.GetAllActors(token)
              .then(resData => {
                setActors(resData.actorList);
                close()
              }));*/
        }}
      />
    </div>
  )
}