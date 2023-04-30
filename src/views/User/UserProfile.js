import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AuthAPI} from "../../api/AuthAPI";
import {DefaultInput} from "../../components/Inputs";
import {authorize} from "../../store/slicers/AuthSlicer";

export const UserProfile = () => {
  const [message, setMessage] = useState(' ')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [nick, setNick] = useState('')
  const [invalidArray, setInvalidArray] = useState([false, false, false, false]);
  const [diasbled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token)
  const role = useSelector(state => state.auth.role)


  useEffect(() => {
    (
      async () => {
        const response = await AuthAPI.GetInfo(token);

        if (!response.ok){
          if (response.status == 401){
            navigate('/authorization')
          }
        } else {
          const data = response.data;
          setEmail(data.email);
          setName(data.firstName);
          setSurname(data.lastName);
          setNick(data.nickName);
        }

      }
    )()
  },[])


  const HandleSave = async () => {
    var inputs = document.querySelectorAll('input');
    var ok = true;
    var newArray = invalidArray.map(x => x);
    inputs.forEach((input, index) => {
      if (input.value.length == 0 ) {
        ok = false;
        input.setCustomValidity("Это обязательное поле")
        newArray[index] = true;
      }
    })
    setInvalidArray(newArray);
    if (ok){
      var response = await AuthAPI.ChangeInfo(token, name, surname, email, nick);
      if (!response.ok){
        if (response.status == 401){
          navigate('/authorization')
        } else {
          setMessage(response.data.description);
        }
      } else {
        dispatch(authorize({token : token, nickname : nick, role : role}))
        setDisabled(true);
      }
    }
  }

  const valueChanged = (ind) => {
    setInvalidArray(invalidArray.map((isVal, innerIndex) => {
      if (innerIndex == ind) {
        return false;
      }
      return isVal;
    }))
  }

  return (
    <div className='mx-auto w-4/12 p-6 flex flex-col gap-6 rounded mt-10'>
      <p className='text-2xl text-center'>Профиль</p>
      <div className='w-full'>
        <p className='px-2'>Имя</p>
        <DefaultInput disabled={diasbled} value={name} setValue={setName} isInvalid={invalidArray[0]} onChange={() => valueChanged(0)}/>
      </div>
      <div>
        <p className='px-2'>Фамилия</p>
        <DefaultInput disabled={diasbled} value={surname} setValue={setSurname} isInvalid={invalidArray[1]} onChange={() => valueChanged(1)}/>
      </div>
      <div>
        <p className='px-2'>Email</p>
        <DefaultInput disabled={diasbled} value={email} setValue={setEmail} isInvalid={invalidArray[2]} onChange={() => valueChanged(2)}/>
      </div>
      <div>
        <p className='px-2'>Логин</p>
        <DefaultInput disabled={diasbled} value={nick} setValue={setNick} isInvalid={invalidArray[3]} onChange={() => valueChanged(3)}/>
      </div>
      {
        diasbled ?
          <button className="bg-gray-200 rounded-lg p-4" onClick={() => setDisabled(false)}>
            Изменить профиль
          </button>
          :
          <div className='flex justify-between gap-4'>
            <button className="bg-gray-200 rounded-lg p-4 w-full" onClick={() => setDisabled(true)}>
              Отмена
            </button>
            <button className=" bg-gray-800 text-white rounded-lg p-4 w-full" onClick={HandleSave}>
              Сохранить
            </button>
          </div>
      }
      <div>
        <p className="text-red-700 font-light">
          {message}
        </p>
      </div>
      <div className="flex justify-end">
        <Link to='password' className="underline" >
          Смена пароля
        </Link>
      </div>
    </div>
  )
}