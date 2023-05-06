import {useEffect, useState} from "react";
import {OfficesAPI} from "../../api";
import {MapWithMarker} from "../../components/Maps";
import './Chain.css'
import {Link} from "react-router-dom";

export const Chain = () => {

  const [cities, setCities] = useState([]);

  useEffect(() => {
    (
      async () => {
        var data = await OfficesAPI.getAllOffices();
        setCities(data.officeList);
      }
    )()
  },[])


  return(
    <div className=''>
      <ul>
        {
          cities.map((city, upInd) => (
            <li>
              <center className='font-semibold text-xl border-y-2 border-gray-400 py-2'>{city.city}</center>
              <ul>
                {
                  city.theatres.map((th, index) => (
                    <li className='py-4 border-b flex justify-between'>
                      <div className='text-lg flex flex-col gap-2 w-3/5'>
                        <p>{th.name}, г. {city.city}, {th.adress}</p>
                        <p>{th.description}</p>
                        <p>Телефон: {th.mobilePhone}</p>
                        <p>Электронная почта: {th.email}</p>
                        <p>Время работы: {th.startWorkTime}:00-{th.endWorkTime}:00</p>
                        <Link to={`/cityoffices/${th.id}`} state={{theater : th.name, city : city.city}} className='text-gray-400 flex w-fit gap-2 hover:text-black border-b-2 border-transparent hover:border-black'>
                          Расписание
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 my-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </Link>
                      </div>
                      <div className='h-72 w-2/5 bg-white'>
                        <div className='bg-white top-0 left-0 h-full w-full'>
                            <MapWithMarker lat={th.latitude} lng={th.longitude} ind={index} upInd={upInd}/>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </li>
          ))
        }
      </ul>

    </div>
  )
}