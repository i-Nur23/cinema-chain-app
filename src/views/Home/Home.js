import {TodayFilmsCard} from "../../components/Cards";
import drive from '../../assets/images/drive.jpg'
import revolver from '../../assets/images/revolver.jpg'
import dune from '../../assets/images/dune.jpg'
import cheburashka from '../../assets/images/cheburashka.jpg'
import inception from '../../assets/images/inception.jpg'
import oppenhaimer from '../../assets/images/oppenhaimer.jpg'

export const Home = () => {

  var films = [
    {
      id: 1,
      name: 'Драйв',
      kp: 7.2,
      imdb : 7.7,
      poster : drive
    },
    {
      id: 2,
      name: 'Револьвер',
      kp: 7.2,
      imdb : 7.7,
      poster : revolver
    },
    {
      id: 3,
      name: 'Дюна',
      kp: 8.7,
      imdb : 9.0,
      poster : dune
    },
    {
      id: 4,
      name: 'Чебурашка',
      kp: 7.2,
      imdb : 7.7,
      poster : cheburashka
    },
    {
      id: 5,
      name: 'Начало',
      kp: 7.2,
      imdb : 7.7,
      poster : inception
    },{
      id: 6,
      name: 'Оппенгеймер',
      kp: 7.2,
      imdb : 7.7,
      poster : oppenhaimer
    },


  ]

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