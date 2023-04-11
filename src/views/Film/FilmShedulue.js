import {useParams} from "react-router-dom";
import drive from "../../assets/images/drive.jpg";
import revolver from "../../assets/images/revolver.jpg";
import dune from "../../assets/images/dune.jpg";
import cheburashka from "../../assets/images/cheburashka.jpg";
import inception from "../../assets/images/inception.jpg";
import oppenhaimer from "../../assets/images/oppenhaimer.jpg";
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


  let content = loaded ?  <div className='container px-20 my-10'>
    <div className='flex justify-start gap-10'>
      <img src={film.poster ?? placeholder} alt={film.name} className='object-cover h-96 rounded-lg'/>
      <div className='flex flex-col gap-5'>
        <p className='text-2xl'><strong>{film.name}</strong></p>
        <p className='text-xl'>{film.description}</p>
        <div className='flex flex-col gap-3'>
          <div className='inline-flex gap-2 text-gray-400'>
            {
              film.genres.map((genre, index) => (
                <p>{genre.description + `${index == film.genres.length - 1 ? '' : ','}`}</p>
              ))
            }
          </div>
          <div className='inline-flex gap-2'>
            <p className='text-gray-400'>Режиссёр: </p>
            {
              film.filmDirectors.map((dir, index) => (
                <p>{dir.name + `${index == film.filmDirectors.length - 1 ? '' : ','}`}</p>
              ))
            }
          </div>
          <div className='inline-flex gap-2'>
            <p className='text-gray-400'>Актёры: </p>
            {
              film.actors.map( (actor, index) => (
                <p>{actor.name + `${index == film.actors.length - 1 ? '' : ','}`}</p>
              ))
            }
          </div>
          <div className='inline-flex gap-2'>
            <p className='text-gray-400'>Год: </p>
            <p>{film.releaseYear}</p>
          </div>
          <div className='inline-flex gap-2'>
            <p className='text-gray-400'>Продолжительность: </p>
            <p>{`${Math.floor(film.length / 60)} ч ${film.length % 60 == 0 ? '' : `${film.length % 60} мин`}`}</p>
          </div>
          <div className='inline-flex gap-2'>
            <p className='text-gray-400'>Кинопоиск: </p>
            <p>{film.ratingOnKinopoisk}</p>
            <p className='text-gray-400'>IMDB: </p>
            <p>{film.ratingOnImdb}</p>
            <p className='text-gray-400'>Наш рейтинг: </p>
            <p>{film.rating}</p>
          </div>
        </div>
      </div>
    </div>
    <FilmSessions table={table}/>

  </div>: null


  return ( content )
}