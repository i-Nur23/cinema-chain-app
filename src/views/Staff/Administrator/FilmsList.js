import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {FilmsAPI} from "../../../api/FilmsAPI";
import {PencilSquareIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {AcceptActionDialog} from "../../../components/Dialogs";
import placeholder from "../../../assets/images/placeholder.jpg"

export const FilmsList = () => {
  const navigate = useNavigate();

  const [films, setFilms] = useState([
    {
      src : placeholder,
      name : "Фильм 1",
      isActive : true,
    },
    {
      src : placeholder,
      name : "Фильм 2",
      isActive: false
    }
  ]);
  const [deletingFilm, setDeletingFilm] = useState(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const token = useSelector(state => state.auth.token);



  const close = () => setOpen(false);

  useEffect(() => {
    (
      async () => {
        try {
          /*const resData = await FilmsAPI.GetAllFilms(token);
          setFilms(resData.filmList);*/
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
      <center className='my-5 text-xl font-semibold'>Фильмы</center>
      <ul>
        {
          films.map(film =>
            <li className="p-3 border-b">
              <div className='flex justify-between'>
                <div className='flex h-32 gap-3'>
                  <img src={film.src} scrolling='no' className='h-full w-24 object-cover rounded-xl'/>
                  <p className='text-lg mt-0'>{film.name}</p>
                  {
                    film.isActive ? <span className='align-bottom text-white bg-blue-700 px-1 rounded-lg h-6'>в прокате</span> : null
                  }
                </div>
                <div className='flex gap-5'>
                  <button onClick={() => changeActivity()} className='hover:text-purple-700'>
                    {film.isActive ? 'Убрать из проката' : 'Включить в прокат'}
                  </button>
                  <Link to={`/staff/main/new_film/${film.id}`} className='hover:text-blue-500 my-auto'>
                    <PencilSquareIcon className='w-6 h-6 my-auto'/>
                  </Link>
                  <XMarkIcon
                    className='w-6 h-6 my-auto cursor-pointer hover:text-red-500'
                    onClick={() => {
                      setDeletingFilm(film);
                      setOpen(true);
                    }}
                  />
                </div>
              </div>
            </li>
          )
        }
      </ul>
      <AcceptActionDialog
        isOpen={open}
        close={() => close()}
        message={`Вы уверены, что ходите удалить из системы фильм: ${deletingFilm?.name} ?`}
        action={() => {
          /*FilmAPI.RemoveFilm(deletingFilm.id, token)
            .then(_ => FilmAPI.GetAllFilms(token)
              .then(resData => {
                setFilms(resData.filmList);
                close()
              }));*/
        }}
      />
    </div>
  )
}