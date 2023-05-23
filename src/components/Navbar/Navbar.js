import {Fragment, useEffect, useState} from "react";
import './navbar.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {OfficesAPI} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {setCity} from "../../store/slicers/CitySlicer";
import {unauthorize} from "../../store/slicers/AuthSlicer";
import {Listbox, Menu, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";
import {ChevronDownIcon} from "@heroicons/react/24/solid";

export const Navbar = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  const city = useSelector(state => state.city.name)
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const nickname = useSelector(state => state.auth.nickname);

  const location = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    (
      async () => {
        var response = await OfficesAPI.getCities();
        setCities(response.cities);
      }
    )()
  }, [token])

  const changeCity = city => {
    dispatch(setCity(city))
  }

  return (
    <div className='container mx-auto px-20'>
      <div className='flex justify-between py-4'>
        <div className='flex justify-start gap-4 w-1/4'>
          <Link to='' className=' my-auto'>
            <p className="font-cressida text-5xl">Драйв</p>
          </Link>
          <Listbox value={city} onChange={city =>{
            //window.location.reload()
            changeCity(city);
          }}>
            <div className="relative my-auto">
              <Listbox.Button className="relative w-full cursor-default  py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                <span className="block truncate">{city}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                  {cities.map((city, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-200 text-black' : 'text-gray-900'
                        }`
                      }
                      value={city}
                    >
                      {({ selected }) => (
                        <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {city}
                      </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="flex justify-center gap-10 w-7/12">
          <Link to="/" className='my-auto text-xl p-4 hover:text-cyan-700 ease-in-out duration-150'>
            Афиша
          </Link>

          <Link to="chain" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Сеть
          </Link>

          <Link to="cityoffices" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Кинотеатры
          </Link>

          <Link to="complaints" className='my-auto p-4 text-xl hover:text-cyan-700 ease-in-out duration-150'>
            Оставить жалобу
          </Link>
        </div>

        <div className='w-2/12 flex justify-end z-50'>
          {
            token == '' ?
              <Link to="authorization" className='my-auto text-xl p-4 rounded hover:bg-cyan-700 hover:text-white ease-in-out duration-300'>
                <p>Вход</p>
              </Link>
            :
              <Menu as="div" className="relative my-auto z-50">
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
                  <Menu.Items
                    className="absolute right-0 z-50 mt-2 divide-y divide-gray-200 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
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
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="user\complaints"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Мои жалобы
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="submit"
                          style={{zIndex : '60'}}
                          className={classNames(
                            active ? 'relative bg-gray-100' : '',
                            'text-red-700 block w-full px-4 py-2 text-left text-sm'
                          )}
                          onClick={() => {
                            dispatch(unauthorize());
                            if(location.pathname.indexOf('user') !== -1){
                              navigate('/authorization')
                            }
                          }}
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