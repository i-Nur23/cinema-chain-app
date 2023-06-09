import {useState} from "react";
import {DateInput, DefaultInput, PasswordInput} from "../Inputs";
import {AuthAPI} from "../../api/AuthAPI";
import {autho, authorize} from "../../store/slicers/AuthSlicer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {InputsHandler} from "../../utils/InputsHandler";

export  const  VisitorRegForm = ({onTypeChange, after, action}) => {
  const [message, setMessage] = useState(' ')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [nick, setNick] = useState('')
  const [password, setPassword] = useState('')
  const [invalidArray, setInvalidArray] = useState([false, false, false, false, false]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleReg = async () => {
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

      if (!InputsHandler.isValidEmail(email)){
        setMessage('Неверный формат email');
        return;
      }

      try {
        var data = await AuthAPI.Register(name, surname, email, nick, password);
        if (!data.isSuccess) {
          setMessage(data.description);
        } else {
          dispatch(authorize({token: data.token, nickname: data.userInfo.nickName, role: data.userInfo.role, branchOfficeId : data.userInfo.branchOfficeId}));
          await action(data.token);
          navigate(after);
        }
      } catch (err) {
        if (err.response.status === 400) {
          setMessage('Email занят')
          return;
        }

        setMessage('Неизвестная ошибка. Попробуйте позже')
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
    <div className=' w-4/12 p-6 flex flex-col gap-6 rounded mt-10'>
      <p className='text-2xl text-center'>Новая учетная запись</p>
      <div className='w-full'>
        <p className='px-2'>Имя</p>
        <DefaultInput value={name} setValue={setName} isInvalid={invalidArray[0]} onChange={() => valueChanged(0)}/>
      </div>
      <div>
        <p className='px-2'>Фамилия</p>
        <DefaultInput value={surname} setValue={setSurname} isInvalid={invalidArray[1]} onChange={() => valueChanged(1)}/>
      </div>
      <div>
        <p className='px-2'>Email</p>
        <DefaultInput value={email} setValue={setEmail} isInvalid={invalidArray[2]} onChange={() => valueChanged(2)}/>
      </div>
      <div>
        <p className='px-2'>Никнейм</p>
        <DefaultInput value={nick} setValue={setNick} isInvalid={invalidArray[3]} onChange={() => valueChanged(3)}/>
      </div>
      <div>
        <p className='px-2'>Пароль</p>
        <PasswordInput value={password} setValue={setPassword} isInvalid={invalidArray[4]} onChange={() => valueChanged(4)}/>
      </div>
      <button className="bg-gray-200 rounded-lg p-4" onClick={HandleReg}>
        Зарегистрироваться
      </button>
      <div>
        <p className="text-red-700 font-light">
          {message}
        </p>
      </div>
      <div className="flex justify-between">
        <p>
          Уже зарегистрированы?
        </p>
        <button className="underline" onClick={onTypeChange}>
          Войти
        </button>
      </div>
    </div>
  )
}