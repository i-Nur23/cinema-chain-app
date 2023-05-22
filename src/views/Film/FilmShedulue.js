import {Link, useParams} from "react-router-dom";
import placeholder from "../../assets/images/placeholder.jpg"
import {FilmSessions} from "../../components/Lists";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {FilmsAPI} from "../../api";

export  const FilmShedulue = (props) => {
  const {id} = useParams();
  const city = useSelector(state => state.city.name)

  const [film, setFilm] = useState();
  const [table, setTable] = useState();
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (
      async () => {
        var data = await FilmsAPI.getFilmInfo(id,city);
        setFilm(data.info);
        setTable(data.sessionSchedule);
        setLoaded(true);
      }
    )()
  },[id, city])


  let content = loaded ?  <div className='my-10'>
    <div className='flex justify-start gap-10'>
      {/*<img src={film.poster ?? placeholder} alt={film.name} className='rounded-lg h-96 object-cover'/>*/}
      <div className='flex flex-col gap-5'>
        <p className='text-2xl'><strong>{film.name}</strong>, {film.ageRestriction}+</p>
        <div className='flex flex-col gap-3'>
          <div className='inline-flex gap-2 text-gray-400'>
            {
              film.genres.map((genre, index) => (
                <p>{genre.description + `${index == film.genres.length - 1 ? '' : ','}`}</p>
              ))
            }
          </div>
          <div className='inline-flex gap-2'>
            <p className='text-gray-400'>Продолжительность: </p>
            <p>{`${Math.floor(film.length / 60)} ч ${film.length % 60 == 0 ? '' : `${film.length % 60} мин`}`}</p>
          </div>
          <Link to='info' state={{film : film}} className='underline text-gray-400 hover:text-black'>
            Посмотреть полную информацию о фильме
          </Link>
        </div>
      </div>
    </div>
    <FilmSessions table={table}/>

  </div>: null


  return ( content )
}