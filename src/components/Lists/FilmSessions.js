import {useParams} from "react-router-dom";
import {TheatreSession} from "../ListElements";
import {AvailableDays} from "./AvailableDays";
import {useEffect, useState} from "react";
import {DateHandler} from "../../utils/DateHandler";

export const FilmSessions = (props) => {

  const {id} = useParams();

  const [day, setDay] = useState([0, DateHandler.getDateAfterDays(0)]);
  const [fullTable, setFullTable] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    setFullTable(props.table);
    var todayFilms = props.table.find(x => x.date == day[1]);
    if (todayFilms != null){
      setTable(todayFilms.theaters)
    } else {setTable(null)}
  }, [table])

  useEffect(() => {
    var todayFilms = fullTable.find(x => x.date == day[1]);
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