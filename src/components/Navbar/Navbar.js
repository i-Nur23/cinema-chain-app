import {Fragment, useEffect, useState} from "react";
import './navbar.css'
import {Link, useLocation} from "react-router-dom";
import {OfficesAPI} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {setCity} from "../../store/slicers/CitySlicer";
import {deleteToken} from "../../store/slicers/AuthSlicer";
import {Menu, Transition} from "@headlessui/react";

export const Navbar = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  const city = useSelector(state => state.city.name)

  /*onst [selectedCity, selectCity] = useState(city)*/
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const nickname = useSelector(state => state.auth.nickname);



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
              <Menu as="div" className="relative my-auto">
                <Menu.Button className="pt-2">
                  <div className="flex content-center">
                    <p className='text-xl'>{nickname}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-5 h-5 m-auto">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                    </svg>
                  </div>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 divide-y divide-gray-200 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="user\profile"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Мой профиль
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="user\bookings"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Мои билеты
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'text-red-700 block w-full px-4 py-2 text-left text-sm'
                          )}
                          onClick={() => dispatch(deleteToken())}
                        >
                          Выйти
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>

          }
        </div>
      </div>
      <hr/>
    </div>
  )
}