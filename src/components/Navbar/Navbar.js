import {useEffect, useState} from "react";
import './navbar.css'
import {Link} from "react-router-dom";
import {OfficesAPI} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {setCity} from "../../store/slicers/CitySlicer";

export const Navbar = () => {


  const city = useSelector(state => state.city)

  /*onst [selectedCity, selectCity] = useState(city)*/
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (
      async () => {
        var response = await OfficesAPI.getCities();
        console.log(response.cities)
        setCities(response.cities);


      }
    )()
  }, [])

  const changeCity = e => {
    var city = e.target.value;
    /*selectCity(city)*/
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

          <a href="#" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Сеть
          </a>

          <Link to="cityoffices" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Кинотеатры
          </Link>

          <a href="#" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Новости
          </a>
        </div>

        <div className='w-1/4 flex justify-end'>
          <Link to="authorization" className='my-auto text-xl p-4 rounded hover:bg-cyan-700 hover:text-white ease-in-out duration-300'>
            <p>Вход</p>
          </Link>
        </div>


      </div>
      <hr/>
    </div>
  )
}