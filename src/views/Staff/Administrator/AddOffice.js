import {DefaultInput} from "../../../components/Inputs";
import {useEffect, useState} from "react";
import {MenuItem, Select, Slider, styled} from "@mui/material";
import {AdminMap} from "../../../components/Maps";
import {XMarkIcon} from "@heroicons/react/24/solid";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {SelectInput} from "../../../components/MUIStyles";
import { useSelector } from "react-redux";
import {OfficesAPI} from "../../../api";
import {useNavigate, useParams} from "react-router-dom";
import {InputsHandler} from "../../../utils/InputsHandler";

export const AddOffice = () => {

  const token = useSelector(state => state.auth.token);
  const {id} = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [method, setMethod] = useState('ADD')
  const [title, setTitle] = useState('Новый филиал');
  const [descr, setDescr] = useState('');
  const [city, setCity] = useState('');
  const [lnglat, setLngLat] = useState([55.7520121,37.619473])
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [workHours, setWorkHours] = useState([5, 27])
  const [invalidArray, setInvalidArray] = useState([false, false, false, false, false]);
  const [halls, setHalls] = useState([{id : -1, rows : 5, places : 5, type : 1, isChanged : false}])
  const [isListChanged, setListChanged] = useState(true)
  const [message, setMessage] = useState('');
  const [loaded, setLoaded] = useState(false);

  const minDistance = 1;

  useEffect(() => {
    if (id === -1) {
      setLoaded(true);
      return;
    }

    OfficesAPI.getDeatilInfoAboutBranchOffice(id, token)
      .then(office => {
        setLngLat([office.longitude, office.latitude])
        setName(office.name);
        setEmail(office.email);
        setPhone(office.mobilePhone);
        setDescr(office.description);

        var start = office.startWorkTime;
        var end = office.endWorkTime;

        if (start < 5){
          start += 24
        }

        if (end < 5){
          end += 24
        }

        setWorkHours([start, end]);
        setCity(office.city);
        setAddress(office.adress);
        setHalls(office.cinemaHallsList.map(hall => {
          const adaptedHall = {
            id : hall.id,
            type : hall.type,
            rows : hall.numOfRow,
            places : hall.numOfPlacesInRow,
            isChanged : false
          }
          return adaptedHall;
        }))
        setListChanged(false);
        setTitle('Изменить филиал');
        setMethod('UPDATE');
        setLoaded(true);
      })
      .catch(err => {setLoaded(true);})
  },[])

  const handleSaving = async () => {
    var inputs = document.querySelectorAll('input[required]');
    var newArray = invalidArray.map(x => x);
    var ok = true;
    inputs.forEach((input, index) => {
      if (input.value.length == 0 ) {
        ok = false;
        input.setCustomValidity("Это обязательное поле")
        newArray[index] = true;
      }
    })
    setInvalidArray(newArray);
    if (ok){

      if (!InputsHandler.isValidEmail(email)){
        setMessage("Неверный формат email");
        return;
      }

      if (!InputsHandler.isValidPhone(phone)){
        setMessage("Неверный формат номера телефона");
        return;
      }

      if (halls.some(hall => hall.rows < 1 || hall.places < 1 || hall.rows > 99 || hall.places > 99)){
        setMessage("Некорректное число рядов или мест");
        return;
      }

      if (method === 'ADD'){
        OfficesAPI.CreateOffice(name, email, phone, descr, workHours[0], workHours[1], city, address,
          lnglat[0], lnglat[1], halls, token)
          .then(_ => {
            navigate('/staff/main/branch_offices');
          })
          .catch(err => {
            setMessage('Ошибка. Попробуйте позже')
          })
      } else {
        OfficesAPI.UpdateOffcie(id, name, email, phone, descr, workHours[0], workHours[1], city, address,
          lnglat[0], lnglat[1], isListChanged, halls, token)
          .then(_ => {
            navigate('/staff/main/branch_offices');
          })
          .catch(err => {
            setMessage('Ошибка. Попробуйте позже')
          })
      }

    }
  }

  const setFullAdrress = (city, address) => {
    valueChanged(3);
    valueChanged(4);
    setCity(city);
    setAddress(address);
  }



  const valueChanged = (ind) => {
    setMessage('');
    setInvalidArray(invalidArray.map((isVal, innerIndex) => {
      if (innerIndex == ind) {
        return false;
      }
      return isVal;
    }))
  }

  const handleSliderChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setWorkHours([Math.min(newValue[0], workHours[1] - minDistance), workHours[1]]);
    } else {
      setWorkHours([workHours[0], Math.max(newValue[1], workHours[0] + minDistance)]);
    }
  }

  const marks = Array.from({length : 23}, (_, index) => {

    var value = (index + 5) % 24;

    return({
      value : index + 5,
      label : value,
    })
  })

  return (
    <div className='flex flex-col gap-8'>
      <center className='text-xl'>{title}</center>

      <div className='grid grid-cols-3 gap-20'>
        <div>
          <p className='px-2'>Название</p>
          <DefaultInput value={name} setValue={(name => setName(name))} isInvalid={invalidArray[0]} onChange={() => valueChanged(0)}/>
        </div>
        <div>
          <p className='px-2'>Email</p>
          <DefaultInput value={email} setValue={(email => setEmail(email))} isInvalid={invalidArray[1]} onChange={() => valueChanged(1)}/>
        </div>
        <div>
          <p className='px-2'>Телефон</p>
          <DefaultInput value={phone} setValue={(phone => setPhone(phone))} isInvalid={invalidArray[2]} onChange={() => valueChanged(2)}/>
        </div>
      </div>

      <div>
        <p className='px-2'>Описание</p>
        <textarea
          className='resize-none rounded-xl w-3/5 border-gray-300 h-40 focus:border-gray-400 focus:ring focus:ring-gray-100 focus:outline-none'
          value={descr}
          onChange={e => setDescr(e.target.value)}
        />
      </div>

      <div className='px-2'>
        <p className='text-lg'>Время работы</p>
        <p className='text-lg'>от {workHours[0] % 24}:00 до {workHours[1] % 24}:00</p>
        <div>
          <Slider
            sx={{
              color : '#369ca3',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                color : '#fff',
                border: '1px solid #369ca3',
                '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                  boxShadow: 'inherit',
                },
              },
            }}
            aria-label="small steps"
            value={workHours}
            step={1}
            marks={marks}
            min={5}
            max={27}
            onChange={handleSliderChange}
          />
        </div>
      </div>
      <hr className='my-10'/>

      <div className='px-2'>
        <center className='text-lg font-semibold'>Залы</center>
        <ul>
          {
            halls.map((hall, index) =>
              <li className='p-3 flex justify-between'>
                <div className='flex gap-4'>
                  <p className='text-gray-400 mt-8'>№ {index + 1}</p>
                  <div>
                    <p>Количество рядов</p>
                    <input
                      value={hall.rows}
                      onChange={(e) => {
                        var newValue = e.target.value;
                        if (isNaN(newValue)) return;
                        let new_halls = halls.map((h, inner_index) => {
                          if (inner_index == index){
                            h.isChanged = true;
                            h.rows = newValue;
                            return h;
                          }
                          return h;
                        })
                        setHalls(new_halls)
                      }}
                      className='border border-gray-300 focus:ring-0 focus:border-gray-300 rounded-lg'
                      type="text"
                    />
                  </div>
                  <div>
                    <p>Количество мест в ряду</p>
                    <input
                      value={hall.places}
                      onChange={(e) => {
                        var newValue = e.target.value;
                        if (isNaN(newValue)) return;
                        let new_halls = halls.map((h, inner_index) => {
                          if (inner_index == index){
                            setListChanged(true);
                            h.isChanged = true;
                            h.places = newValue;
                            return h;
                          }
                          return h;
                        })

                        setHalls(new_halls)
                      }}
                      className='border border-gray-300 focus:ring-0 focus:border-gray-300 rounded-lg'
                      type="text"
                    />
                  </div>
                  <div>
                    <p>Тип зала</p>
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      input={<SelectInput/>}
                      value={hall.type}
                      onChange={(e) => {
                        var newValue = e.target.value;
                        let new_halls = halls.map((h, inner_index) => {
                          if (inner_index == index){
                            setListChanged(true);
                            h.isChanged = true;
                            h.type = newValue;
                            return h;
                          }
                          return h;
                        })

                        setHalls(new_halls)
                      }}
                    >
                      <MenuItem value={1}>2D</MenuItem>
                      <MenuItem value={2}>3D</MenuItem>
                      <MenuItem value={3}>IMAX</MenuItem>
                    </Select>
                  </div>
                </div>
                <XMarkIcon
                  className='w-6 h-6 my-auto hover:text-red-600'
                  onClick={() => setHalls (halls.filter((_, inner_index) => index !== inner_index))}
                />
              </li>
            )
          }
          <li
            className='hover:bg-gray-100 p-4 flex justify-center cursor-pointer'
            onClick={() => {
              setHalls([...halls, {id: -1, rows: 5, places: 5, type: 1, isChanged: true}]);
              setListChanged(true);
            }}
          >
            <PlusCircleIcon className='w-6 h-6 my-auto'/>
          </li>
        </ul>
      </div>
      
      <hr className='my-10'/>
      <div className='px-2 text-lg font-semibold'>
        <center>Выберете местоположение кинотеатра</center>
        <div className='h-96 mt-5'>
          {loaded && <AdminMap
            lng={lnglat[0]}
            lat={lnglat[1]}
            setLngLat={(_lng, _lat) => setLngLat([_lng, _lat])}
            setFullAddress={(address, city) => setFullAdrress(city, address)}
          />}
        </div>
      </div>

      <div className='grid grid-cols-4 gap-20'>
        <div>
          <p className='px-2'>Город</p>
          <DefaultInput disabled={true} value={city} setValue={(city => setCity(city))} isInvalid={invalidArray[3]} onChange={() => valueChanged(3)}/>
        </div>
        <div className='col-span-3'>
          <p className='px-2'>Адрес</p>
          <DefaultInput value={address} setValue={(address => setAddress(address))} isInvalid={invalidArray[4]} onChange={() => valueChanged(4)}/>
        </div>
      </div>
      <div className='flex justify-end'>
        <div className="w-1/6">
          <button
            className='rounded-lg p-3 w-full text-white bg-cyan-800 hover:bg-cyan-700'
            onClick={handleSaving}
          >
            Сохранить
          </button>
          <p className="text-red-700 text-center mt-2">{message}</p>  
        </div>
      </div>

    </div>
  )
}


var req = {
  branchOfficeId : 1,
  date : "число, для которого составляется расписание",
  table : {
    halls : [
      {
        id : 1,
        seanceIds : [-1, -8]
      }
    ],
    seances : [
      {
        id : -1,
        cost: "250",
        film : {
          id : 1,
          duration : 90
        }
      },
      {
        id : -8,
        cost: "-1",
        film : {
          id : 0,
          duration : 100
        }
      },
    ]
  }

}