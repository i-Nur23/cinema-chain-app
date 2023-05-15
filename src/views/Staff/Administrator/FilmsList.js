import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {FilmsAPI} from "../../../api/FilmsAPI";
import {PencilSquareIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {AcceptActionDialog} from "../../../components/Dialogs";
import placeholder from "../../../assets/images/placeholder.jpg"

export const FilmsList = () => {
  const navigate = useNavigate();

  const [films, setFilms] = useState([]);
  const [deletingFilm, setDeletingFilm] = useState(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const token = useSelector(state => state.auth.token);



  const close = () => setOpen(false);

  useEffect(() => {
    (
      async () => {
        try {
          const films = await FilmsAPI.GetAllFilms(token);
          setFilms(films);
          setLoaded(true)
        } catch (err) {
          navigate('/staff')
        }
      }
    )()
  },[])

  const changeActivity = async (id, isActive) => {
    FilmsAPI.changeActivity(id, isActive, token)
      .then(_ => {
        var newFilmsList = [];
        films.forEach(film => {
          if (film.id !== id){
            newFilmsList.push(film)
          } else {
            newFilmsList.push({...film, isActive : !isActive})
          }
        })
        setFilms(newFilmsList);
      })
      .catch(err => console.log(err))
  }

  return loaded && (
    <div>
      <center className='my-5 text-xl font-semibold'>Фильмы</center>
      <ul>
        {
          films.map(film =>
            <li className="p-3 border-b" key={film.id}>
              <div className='flex justify-between'>
                <div className='flex h-32 gap-3'>
                  <img src={film.poster} scrolling='no' className='h-full w-24 object-cover rounded-xl'/>
                  <p className='text-lg mt-0'>{film.name}</p>
                  {
                    film.isActive ? <span className='align-bottom text-white bg-blue-700 px-1 rounded-lg h-6'>в прокате</span> : null
                  }
                </div>
                <div className='flex gap-5'>
                  <button onClick={() => changeActivity(film.id, film.isActive)} className='hover:text-purple-700'>
                    {film.isActive ? 'Убрать из проката' : 'Включить в прокат'}
                  </button>
                  <Link to={`${film.id}`} className='hover:text-blue-500 my-auto focus:outline-none'>
                    <PencilSquareIcon className='w-6 h-6 my-auto'/>
                  </Link>
                </div>
              </div>
            </li>
          )
        }
      </ul>
    </div>
  )
}