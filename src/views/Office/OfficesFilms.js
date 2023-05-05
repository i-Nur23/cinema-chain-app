import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {OfficesAPI} from "../../api";
import {DateHandler} from "../../utils/DateHandler";
import {AvailableDays} from "../../components/Lists/AvailableDays";
import dune from '../../assets/images/dune.jpg'
import drive from "../../assets/images/drive.jpg";
import {SessionCard} from "../../components/Cards";

export const OfficesFilms = (props) => {
  var {id} = useParams();
  var location = useLocation();
  var navigate = useNavigate();

  const [fullSeances, setFullSeances] = useState([]);
  const [films, setFilms] = useState([]);
  const [day, setDay] = useState([0, DateHandler.getDateAfterDays(0)]);

  useEffect(() => {
    (
      async () => {
        var data = await OfficesAPI.getOfficeSeances(id);
        setFullSeances(data.sessionShedule);
        var todaysFilms = data.sessionShedule.find(table => table.date == day[1]);
        if (!todaysFilms){
          setFilms([]);
        } else {
          setFilms(todaysFilms.films);
        }
      }
    )()
  },[])

  useEffect(() => {
    var todayFilms = fullSeances.find(table => table.date == day[1]);
    if (!todayFilms){
      setFilms([]);
    } else {
      setFilms(todayFilms.films);
    }
  },[day])

  let content =
    <div className=''>
      <center className='text-2xl mt-6'>Распиcание кинотеатра {location.state.theater}, г. {location.state.city}</center>
      <AvailableDays day={day} setDay={setDay}/>
      <ul>
        {
          films.map(film => (
            <li className='flex justify-between p-4 border-b'>
              <div className='flex gap-3'>
                <img
                  src={film.film.posterURL} className='object-fill h-44 rounded-xl cursor-pointer'
                  onClick={() => navigate(`/films/${film.film.id}/info`)}
                />
                <div>
                  <p
                    className='font-semibold text-lg cursor-pointer'
                    onClick={() => navigate(`/films/${film.film.id}/info`)}
                  >
                    {film.film.name}
                  </p>
                  <p className='text-gray-400'>{film.film.ageRestriction}+</p>
                </div>
              </div>
              <div className='grid grid-cols-3 gap-4'>
                {film.seances.map(session => (
                  <SessionCard seance={session}/>
                ))}
              </div>
            </li>
          ))
        }
      </ul>
    </div>

  return(content);
}