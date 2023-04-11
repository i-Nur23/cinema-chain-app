import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {UserAPI} from "../../api/UserAPI";
import {useNavigate} from "react-router-dom";

export const UserBookings = () => {

  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const [pastBookings, setPastBookings] = useState([]);
  const [futureBookings, setFutureBookings] = useState([])

  useEffect(() => {
    (
      async () => {
        UserAPI.getAllBookings(token)
          .then(res => {
            console.log(res.request)
            setPastBookings(res.data.past);
            setFutureBookings(res.data.future);
          })
          .catch(err => {
            console.log(err)
            navigate('/authorization')
          })
      }
    )()
  },[])

  return(
    <div className='container px-20'>
      {pastBookings == [] && futureBookings == [] ?
        <p className='text-gray-600 text-xl'>Билетов пока нет</p>
      :
        <div>
          <center className='text-xl'>Ваши билеты</center>
          <ul>
            {
              futureBookings.map(b => (
                <li className='p-3 border-b flex justify-between'>
                  <div>
                    <p>{b.filmName}</p>
                    <p className='text-gray'>{b.branchOfficeName}, {b.branchOfficeAdress}</p>
                    <p className='text-gray'>
                      Зал № {b.cinemaHallName}, {b.seanceStartTime.substring(8,10)}.{b.seanceStartTime.substring(5,7)}.{b.seanceStartTime.substring(0,4)}
                      {b.seanceStartTime.substring(11,13)}:{b.seanceStartTime.substring(14,16)}
                    </p>
                  </div>
                  <p>Ряд: {b.rowNumber} Место: {b.placeNumber}, {b.ticketCost} руб</p>
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  )
}