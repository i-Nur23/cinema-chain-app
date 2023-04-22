import {TodayFilmsCard} from "../../components/Cards";
import {useEffect, useState} from "react";
import {FilmsAPI} from "../../api";

export const Home = () => {


  const [films, setFilms] = useState([])

  useEffect( () => {
    ( async () => {
        var data = await FilmsAPI.getFilmsToStartPage();
        setFilms(data.filmList);
    }
    )()
  }, [])

  return(
    <div className='container px-20 my-6'>
      <p className='text-2xl mb-5'><center>Сегодня в кино</center></p>
      <div className='grid grid-cols-3 gap-10'>
        {films.map(film => (
          <TodayFilmsCard film={film}/>
        ))}
      </div>
    </div>
  )
}