import {useState} from "react";
import './navbar.css'
import {Link} from "react-router-dom";

export const Navbar = () => {


  const cities = ['Москва', 'Казань', 'Екатеринбург', 'Иннополис']

  const [city, setCity] = useState(cities[0]);

  return (
    <div className='container px-20'>
      <div className='flex justify-between py-4'>
        <div className='flex justify-start gap-8 w-1/4'>
          <a className=' my-auto'>
            <p className="font-cressida text-5xl">Драйв</p>
          </a>
          <select className='focus:outline-none'>
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

          <a href="#" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Акции
          </a>

          <a href="#" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Новости
          </a>
        </div>

        <div className='w-1/4 flex justify-end'>
          <Link to="authorization" className='my-auto text-xl p-4 rounded hover:bg-cyan-700 hover:text-white ease-in-out duration-300'>
            <p>Вход</p>
          </Link>
          {/*<a className='my-auto text-xl p-4 rounded hover:bg-cyan-700 hover:text-white ease-in-out duration-300' href="authorization">
          </a>*/}
        </div>


      </div>
      <hr/>
    </div>
  )
}