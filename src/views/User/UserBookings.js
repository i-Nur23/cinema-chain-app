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
      UserAPI.getAllBookings(token)
          .then(res => {
            setPastBookings(res.data.past);
            setFutureBookings(res.data.future);
          })
          .catch(err => {
            console.log(err)
            navigate('/authorization')
          })
  },[])

  return(
    <div className=''>
      {pastBookings == [] && futureBookings == [] ?
        <p className='text-gray-600 text-xl'>Билетов пока нет</p>
      :
        <div>
          <center className='text-xl mt-8'>Ваши билеты</center>
          <ul>
            {
              futureBookings.map(b => (
                <li className='p-3 border-b flex justify-between'>
                  <div>
                    <p className='font-semibold text-lg'>{b.filmName}</p>
                    <p className='text-gray-500'>{b.branchOfficeName}, {b.branchOfficeAdress}</p>
                    <p className='text-gray-500'>
                      Зал № {b.cinemaHallName}, &nbsp;{b.seanceStartTime.substring(8,10)}.{b.seanceStartTime.substring(5,7)}.{b.seanceStartTime.substring(0,4)}, &nbsp;
                      {b.seanceStartTime.substring(11,13)}:{b.seanceStartTime.substring(14,16)}
                    </p>
                  </div>
                  <p className='my-auto'>Ряд: {b.rowNumber} Место: {b.placeNumber}, Цена: {b.ticketCost} руб</p>
                </li>
              ))
            }
          </ul>
          <ul>
            {
              pastBookings.map(b => (
                <li className='p-3 border-b flex justify-between text-gray-300'>
                  <div>
                    <p className='font-semibold text-lg'>{b.filmName}</p>
                    <p>{b.branchOfficeName}, {b.branchOfficeAdress}</p>
                    <p>
                      Зал № {b.cinemaHallName}, &nbsp;{b.seanceStartTime.substring(8,10)}.{b.seanceStartTime.substring(5,7)}.{b.seanceStartTime.substring(0,4)}, &nbsp;
                      {b.seanceStartTime.substring(11,13)}:{b.seanceStartTime.substring(14,16)}
                    </p>
                  </div>
                  <p className='my-auto'>Ряд: {b.rowNumber} Место: {b.placeNumber}, Цена: {b.ticketCost} руб</p>
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  )
}