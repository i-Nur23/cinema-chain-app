import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {OfficesAPI} from "../../api";
import {Link} from "react-router-dom";
import './cityoffices.css'

export const CityOffices = () => {
  const [offices, setOffices] = useState(null);
  const city = useSelector(state => state.city.name);

  useEffect(() => {
    (
      async () => {
        var data = await OfficesAPI.getOfficesByCity(city);
        setOffices(data.officeList);
      }
    )()
  },[city])

  let content = !offices ? null :
    <div className='container px-20 mt-8'>
      <center className='text-2xl'>Кинотеатры города <em>{city}</em></center>
      <ul>
        {
          offices.map(office => (
            <li className='px-4 py-8 border-b flex justify-between'>
              <div>
                <strong>{office.name}</strong>
                <p className='text-gray-400'>{office.adress}</p>
              </div>
              <Link to={`${office.id}`} state={{theater : office.name, city : city}} className='my-auto flex gap-2 hover:gap-4 ease-in-out duration-200 border-b-2 border-transparent hover:border-black to-table'>
                Расписание
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                     className="w-0 h-4 my-auto invisible hover:visible hover:w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>


  return(content);
}