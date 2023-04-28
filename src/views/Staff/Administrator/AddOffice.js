import {DefaultInput} from "../../../components/Inputs";
import {useState} from "react";
import {Slider, styled} from "@mui/material";
import {AdminMap} from "../../../components/Maps";

export const AddOffice = () => {

  const [name, setName] = useState('');
  const [descr, setDescr] = useState('');
  const [city, setCity] = useState('');
  const [lnglat, setLngLat] = useState([55.7520121,37.619473])
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [workHours, setWorkHours] = useState([5, 27])
  const [invalidArray, setInvalidArray] = useState([false, false, false, false, false]);
  const [message, setMessage] = useState('')

  const minDistance = 1;

  const handleSaving = async () => {
    var inputs = document.querySelectorAll('input[required]');
    console.log(inputs);
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
    <div className='flex flex-col gap-8 m-10 p-5 bg-white rounded-2xl border'>
      <center className='text-xl'>Новый филиал</center>

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
          className='resize-none rounded-xl w-3/5 border-gray-300 h-20 focus:border-gray-400 focus:ring focus:ring-gray-100 focus:outline-none'
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
      <div className='px-2 text-lg font-semibold'>
        <center>Выберете местоположение кинотеатра</center>
        <div className='h-96 mt-5'>
          <AdminMap
            lng={lnglat[0]}
            lat={lnglat[1]}
            setLngLat={(lng, lat) => setLngLat([lng, lat])}
            setFullAddress={(address, city) => setFullAdrress(city, address)}
          />
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
        <button
          className='rounded-lg p-3 w-1/6 text-white bg-cyan-800 hover:bg-cyan-700'
          onClick={handleSaving}
        >
          Сохранить
        </button>
      </div>


    </div>
  )
}