import {useParams} from "react-router-dom";
import {TheatreSession} from "../ListElements";
import {AvailableDays} from "./AvailableDays";
import {useEffect, useState} from "react";
import {DateHandler} from "../../utils/DateHandler";


const theatres = [
  {
    'kinotheatre' : {
      'name' : 'ТЦ \"Авиапарк\", проспект Мира, 138Б',
      'city' : 'Москва'
    },
    'sessions' :[
      {
        'id'  : 1,
        'time' : new Date('2023-03-22T10:20:00.511Z'),
        'type' : '2D',
        'initPrice' : 200
      },
      {
        'id' : 2,
        'time' : new Date('2023-03-22T11:50:00.511Z'),
        'type' : '3D',
        'initPrice' : 270
      },
      {
        'id' : 3,
        'time' : new Date('2023-03-22T10:20:00.511Z'),
        'type' : '2D',
        'initPrice' : 200
      },
      {
        'id' : 4,
        'time' : new Date('2023-03-22T10:20:00.511Z'),
        'type' : '2D',
        'initPrice' : 200
      },

    ]
  },
  {
    'kinotheatre' : {
      'name' : 'Кинотеатр \"Колокольчик\", ул. Дзержинского, 23',
      'city' : 'Москва'
    },
    'sessions' :[
      {
        'id'  : 5,
        'time' : new Date('2023-03-22T10:20:00.511Z'),
        'type' : '2D',
        'initPrice' : 200
      },
      {
        'id' : 6,
        'time' : new Date('2023-03-22T11:50:00.511Z'),
        'type' : '3D',
        'initPrice' : 270
      },
      {
        'id' : 7,
        'time' : new Date('2023-03-22T10:20:00.511Z'),
        'type' : '2D',
        'initPrice' : 200
      },
    ]
  }
]


export const FilmSessions = (props) => {

  const {id} = useParams();

  const [day, setDay] = useState([0, DateHandler.getDateAfterDays(0)]);
  const [fullTable, setFullTable] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    setFullTable(props.table);
    var todayFilms = fullTable.find(x => x.date == day[1]);
    console.log(todayFilms)
    if (todayFilms != null){
      setTable(todayFilms.theaters)
    } else {setTable(null)}
  }, [table])

  useEffect(() => {
    var todayFilms = fullTable.find(x => x.date == day[1]);
    console.log('Day change')
    if (todayFilms != null){
      setTable(todayFilms.theaters)
    } else {setTable(null)}
  }, [day])

  return(
    <div className='mt-10'>
      <p className='text-2xl'><center>Расписание сеансов</center></p>

      <AvailableDays day={day} setDay={setDay}/>

      <ul>
        {table ? table.map((th, index) => (
          <li className=' py-5 border-b' key={index}>
            <TheatreSession theater={th.name} table={th.seances} />
          </li>
        )) : null}
      </ul>
    </div>
  )



}