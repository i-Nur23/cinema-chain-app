import {Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {DisabledHallPlace, HallPlace} from "../Checkboxes";
import {SeanceAPI} from "../../api/SeanceAPI";
import {BookingAPI} from "../../api/BookingAPI";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const TicketChoiceDialog = ({isOpen, close, basePrice, id}) => {

  const ref = useRef();
  const listRef = useRef();
  const ticketsPRef = useRef();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  let content = null;

  const [rows, setRows] = useState();
  const [placesInRow, setPlacesInRow] = useState();
  const [hallNumber, setHallNumber] = useState();
  const [film, setFilm] = useState();

  const [chosenTickets, setChosenTickets] = useState([]);

  const [places, setPlaces] = useState(null);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState('');

  const [bookedPlaces, setBookedPlaces] = useState([]);
  const [style, setStyle] = useState();
  const [listStyle, setListStyle] = useState();

  useEffect(() => {
    (
      async () => {
        var data = await SeanceAPI.getSeanceInfo(id);

        setHallNumber(data.cinemaHallName);
        setRows(data.numOfRow);
        setPlacesInRow(data.numOfPlacesInRow);
        setFilm(data.filmName);

        var arrOfBookedPlace = data.places.map(x => [x.rowNumber, x.placeNumber]);

        setBookedPlaces(arrOfBookedPlace);

        var hall = [];

        for (let i = 0; i < data.numOfRow; i++){
          var row = [];

          for (let j = 0; j < data.numOfPlacesInRow; j++){
            row.push(false)
          }

          hall.push(row);
        }
        setPlaces(hall);

        setChosenTickets([])

      }
    )()
  }, [isOpen])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) {
        var height = ref.current.clientHeight;
        var pHeight = ticketsPRef.current.clientHeight;
        var diff = height - pHeight;
        setStyle({maxHeight: `${height}px`})
        setListStyle({maxHeight: `${diff}px`})
      }
    },1000)

    return () => clearTimeout(timer)

  },[])

  const placeChoice = (row, place) => {
    // Включение и выключение из массива выбранных мест
    if (places[row][place]){
      setChosenTickets(chosenTickets.filter(ticket => !(ticket[0] == row && ticket[1] == place)));
      if (row > 1 && row < rows - 2 && place > 2 && place < placesInRow - 3){
        setPrice(price - Math.round ( basePrice * 1.2 / 10 ) * 10)
      } else {
        setPrice(price - basePrice)
      }
    } else {
      setChosenTickets([...chosenTickets, [row, place,
        row > 1 && row < rows - 2 && place > 2 && place < placesInRow - 3 ? Math.round ( basePrice * 1.2 / 10 ) * 10 : basePrice]])
      if (row > 1 && row < rows - 2 && place > 2 && place < placesInRow - 3){
        setPrice(price + Math.round ( basePrice * 1.2 / 10 ) * 10)
      } else {
        setPrice(price + basePrice)
      }
    }

    // Смена статуса места в матрице
    const newArr = places.map((row_array, index) => {
      if (index == row){
        const newRow  = row_array.map((isChecked, index) => {
          if (index == place){
            return !isChecked;
          }

          return isChecked;
        })

        return newRow;
      }

      return row_array;
    })

    setPlaces(newArr);
  }

  const PlacesRow = ({row}) => {
    return (
    <div className='flex justify-between gap-4'>
      <p className='text-gray-400'>{row + 1}</p>
      <div className='flex justify-between gap-4'>
        {
          Array.from(Array(placesInRow).keys()).map(place => {

              return ( bookedPlaces.findIndex(x => x[0] - 1 == row && x[1] - 1 == place) == -1 ?
                  <HallPlace
                    row={row}
                    place={place}
                    checked={ places == undefined || places.length == 0 ? false : places[row][place]}
                    setChoice={(x,y) => {
                      placeChoice(x,y);
                      setMessage('')
                    }}
                    color={ row > 1 && row < rows - 2 && place > 2 && place < placesInRow - 3 ? 'cyan' : 'blue'}
                    index={row * placesInRow + place}
                  />
                  :
                  <DisabledHallPlace place={place}/>
              )
            }
          )
        }
      </div>
      <p className='text-gray-400'>{row + 1}</p>
    </div>
  )}

  const handleBooking = async () => {
    if (chosenTickets.length == 0){
      setMessage('Выберите места');
      return;
    }

    var res = BookingAPI.bookPlaces(id, chosenTickets, token)
      .then(res => {
        if (res.status){
          console.log('status is ok')
          navigate('/user/bookings')
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response.status == 401){
          navigate('/authorization', {
            state : {
              reason : 'Войдите перед тем как забронировать билеты',
              after : '/user/bookings'
            }
          });
        } else {
          console.log(err)
        }
      })


    /*if (res.status == 401){
      navigate('/authorization', {
        state : {
          reason : 'Войдите перед тем как забронировать билеты',
          after : '/'
        }
      });
      return;
    }*/


  }


  content = !places ?  null :
    <Dialog as="div" className="relative z-30 w-full max-h-screen" onClose={close}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
    </Transition.Child>

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        ><div>
          <Dialog.Panel className="w-full max-h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-xl font-medium leading-6 text-gray-900 text-center mb-4"
            >
              <strong>{film}</strong>, Зал №{hallNumber}
            </Dialog.Title>
            <div className="grid grid-cols-4 gap-2">
              <div className='col-span-3 flex flex-col gap-4 p-4'>
                <div>
                  <hr className='border border-2'/>
                  <center className='text-gray-400'>Экран</center>
                </div>
                <div className='flex flex-col gap-4'>
                  {
                    Array.from(Array(rows).keys()).map(row => { return <PlacesRow row={row}/>})
                  }
                </div>
                <div className='flex justify-evenly'>
                  <div className='flex text-base gap-2'>
                    <div
                      className="rounded w-4 h-4 outline-none bg-gray-400 my-auto"
                    ></div>
                    <div className='align-bottom text-gray-400 pt-1'>
                      <p className='max-h-fit'>занято</p>
                    </div>
                  </div>
                  <div className='flex text-base gap-2'>
                    <div
                      className="rounded w-4 h-4 outline-none bg-blue-700 my-auto"
                    ></div>
                    <div className='align-bottom text-gray-400 pt-1'>
                      <p className='max-h-fit'>{basePrice}</p>
                    </div>
                  </div>
                  <div className='flex text-base gap-2'>
                    <div
                      className="rounded w-4 h-4 outline-none bg-cyan-700 my-auto"
                    ></div>
                    <div className='align-bottom text-gray-400 pt-1'>
                      <p className='max-h-fit'>{Math.round ( basePrice * 1.2 / 10 ) * 10 }</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col py-4 divide-y resize-none'>
                <div className='flex-auto overflow-hidden' ref={ref} style={style}>
                  <p className='text-center text-lg mb-3' ref={ticketsPRef}>
                    Выбранные места
                  </p>
                  <ul className='overflow-auto ' ref = {listRef} style={listStyle}>{
                    chosenTickets.map(place => (
                      <li className=' px-2 py-4'>
                        <div className='flex justify-between'>
                          <p>Ряд {place[0] + 1}, Место {place[1] + 1}</p>
                          <a onClick={() => placeChoice(place[0], place[1])} className='cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </a>
                        </div>
                      </li>
                    ))
                  }
                  </ul>
                </div>
                <div>
                  <p className='my-4'>Общая сумма: {price} руб</p>
                  <button
                    className='h-12 w-full bg-gray-100 hover:bg-gray-300 rounded-lg ease-in-out duration-50'
                    onClick={handleBooking}
                  >
                    Оплатить
                  </button>
                  <p className='text-sm text-red-500'>
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
        </Transition.Child>
      </div>
    </div>
  </Dialog>

  return( content )
}