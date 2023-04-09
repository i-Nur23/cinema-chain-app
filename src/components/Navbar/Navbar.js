import {useEffect, useState} from "react";
import './navbar.css'
import {Link} from "react-router-dom";
import {OfficesAPI} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {setCity} from "../../store/slicers/CitySlicer";

export const Navbar = () => {


  const city = useSelector(state => state.city.name)

  /*onst [selectedCity, selectCity] = useState(city)*/
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

  let token = localStorage.getItem('token');

  useEffect(() => {
    (
      async () => {
        console.log(city);
        var response = await OfficesAPI.getCities();
        console.log(response.cities);
        setCities(response.cities);


      }
    )()
  }, [token])

  const changeCity = e => {
    var city = e.target.value;
    /*selectCity(city)*/
    console.log(city)
    dispatch(setCity(city))
  }

  return (
    <div className='container px-20'>
      <div className='flex justify-between py-4'>
        <div className='flex justify-start gap-8 w-1/4'>
          <Link to='' className=' my-auto'>
            <p className="font-cressida text-5xl">Драйв</p>
          </Link>
          <select
            className='focus:outline-none focus:ring-0 border-0'
            onChange={e =>{
              changeCity(e);
              window.location.reload();
            }}
            value={city}>
            {cities.map(city => (
              <option value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-between gap-20 w-1/2">
          <a href="#" className='my-auto text-xl p-4 hover:text-cyan-700 ease-in-out duration-150'>
            Афиша
          </a>

          <Link to="chain" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Сеть
          </Link>

          <Link to="cityoffices" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Кинотеатры
          </Link>

          <a href="#" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Новости
          </a>
        </div>

        <div className='w-1/4 flex justify-end'>
          {
            token == '' ?
            <Link to="authorization" className='my-auto text-xl p-4 rounded hover:bg-cyan-700 hover:text-white ease-in-out duration-300'>
              <p>Вход</p>
            </Link>
              :
              <div className='my-auto'>
                <button id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        className="inline-flex items-center text-xl"
                        type="button">Dropdown button
                  <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none"
                                                           stroke="currentColor" viewBox="0 0 24 24"
                                                           xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div id="dropdown"
                     className="text-sm z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                      <a href="#"
                         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Профиль</a>
                    </li>
                    <li>
                      <a href="#"
                         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Мои билеты</a>
                    </li>
                  </ul>
                    <div>
                      <a href="#"
                         className="block text-red-600 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Выход</a>
                    </div>
                </div>
              </div>
          }
        </div>
      </div>
      <hr/>
    </div>
  )
}