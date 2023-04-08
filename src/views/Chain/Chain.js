import {useEffect, useState} from "react";
import {OfficesAPI} from "../../api";
import {MapWithMarker} from "../../components/Maps";
import './Chain.css'

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
    <div className='container px-20'>
      <ul>
        {
          cities.map((city, upInd) => (
            <li>
              <center className='font-semibold text-xl border-y-2 border-gray-400 py-2'>{city.city}</center>
              <ul>
                {
                  city.theatres.map((th, index) => (
                    <li className='py-4 border-b flex justify-between'>
                      <div className='text-lg flex flex-col gap-2'>
                        <p>{th.name}, г. {city.city}, {th.adress}</p>
                        <p>{th.description}</p>
                        <p>Телефон: {th.mobilePhone}</p>
                        <p>Электронная почта: {th.email}</p>
                        <p>Время работы: {th.workTime}</p>
                      </div>
                      <div className='h-72 w-2/5'>
                        <MapWithMarker lat={th.latitude} lng={th.longitude} ind={index} upInd={upInd}/>
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