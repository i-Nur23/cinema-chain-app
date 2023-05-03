import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ActorDirectorElement} from "../ListElements/ActorDirectorElement";
import {AcceptActionDialog} from "../Dialogs";

export const DirectorsPanel = () => {
  const navigate = useNavigate();

  const [directors, setDirectors] = useState([
    {
      firstName : "Райан",
      lastName : "Гослинг"
    },
    {
      firstName : "Кристиан",
      lastName : "Бейл"
    }
  ]);
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [newDirectorName, setNewDirectorName] = useState('');
  const [newDirectorSurname, setNewDirectorSurname] = useState('');
  const token = useSelector(state => state.auth.token);

  const close = () => setOpen(false);

  useEffect(() => {
    (
      async () => {
        try {
          /*const resData = await DirectorsAPI.GetAllDirectors(token);
          setDirectors(resData.directorList);*/
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
          directors.map(director =>
            <ActorDirectorElement
              onDelete={(id) => {

                setSelectedDirector(director);
                setOpen(true);
              }
              }

              onSave={(id, firstName, lastName) => {
                setSelectedDirector(director);
              }
              }

              firstName={director.firstName}
              lastName={director.lastName}
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
              <input
                className='p-2 border rounded-lg focus:outline-none'
                value={newDirectorSurname}
                onChange={e => setNewDirectorSurname(e.target.value)}
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
        message={`Вы уверены, что ходите удалить из системы режиссера: ${selectedDirector?.firstName}  ${selectedDirector?.lastName}?`}
        action={() => {
          /*DirectorAPI.RemoveDirector(deletingDirector.id, token)
            .then(_ => DirectorAPI.GetAllDirectors(token)
              .then(resData => {
                setDirectors(resData.directorList);
                close()
              }));*/
        }}
      />
    </div>
  )
}