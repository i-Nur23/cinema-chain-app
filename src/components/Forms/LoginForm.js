import {useState} from "react";
import {DefaultInput, PasswordInput} from "../Inputs";
import {AuthAPI} from "../../api/AuthAPI";
import {useDispatch} from "react-redux";
import {setToken} from "../../store/slicers/AuthSlicer";
import {useNavigate} from "react-router-dom";

export const LoginForm = () => {
  const [message, setMessage] = useState(' ')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalidArray, setInvalidArray] = useState([false, false, false, false, false]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleReg = async () => {
    var inputs = document.querySelectorAll('input');
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
      var data = await AuthAPI.LogIn(email, password);
      if (!data.isSuccess){
        setMessage(data.description);
      } else {
        //dispatch(setToken(data.token));
        localStorage.setItem('token', data.token)
        navigate("/");
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
    <div className='container p-6 flex flex-col gap-6 rounded'>
      <p className='text-2xl text-center'>Вход</p>

      <div className='w-full'>
        <p className='px-2'>Email</p>
        <DefaultInput value={email} setValue={setEmail} isInvalid={invalidArray[0]} onChange={() => valueChanged(0)}/>
      </div>

      <div className='w-full'>
        <p className='px-2'>Пароль</p>
        <PasswordInput value={password} setValue={setPassword} isInvalid={invalidArray[1]} onChange={() => valueChanged(1)}/>
      </div>

      <div>
        <button className="bg-gray-200 rounded-lg p-4 w-full" onClick={() => HandleReg()}>
          Войти
        </button>
      </div>
      <div>
        <p className="text-red-700 font-light">
          {message}
        </p>
      </div>

    </div>
  )
}