import '../style.css'
import {DefaultInput, PasswordInput} from "../../../components/Inputs";
import {useEffect, useState} from "react";
import {AuthAPI} from "../../../api/AuthAPI";
import {authorize} from "../../../store/slicers/AuthSlicer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export const StaffAuthorization = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(state => state.auth.role);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidArray, setInvalidArray] = useState([false, false]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (! (role === "" || role ===  "User")){
      navigate('main');
    }
  }, [])


  const valueChanged = (ind) => {
    setMessage('');
    setInvalidArray(invalidArray.map((isVal, innerIndex) => {
      if (innerIndex == ind) {
        return false;
      }
      return isVal;
    }))
  }

  const handleEnter = async () => {
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

      try {
        const resData = await AuthAPI.LogIn(email, password);
        if (resData?.userInfo?.role === "User") {
          setMessage('Пользователь не найден')
          return;
        }

        dispatch(authorize({token: resData.token, nickname: resData.userInfo.nickName, role: resData.userInfo.role, branchOfficeId : resData.userInfo.branchOfficeId}));
        navigate('main');

      } catch (err) {

        console.log(err.response)
        if (err.response.status === 404) {
          setMessage('Пользователь не найден')
          return;
        }

        setMessage('Неизвестная ошибка. Попробуйте позже')
      }

    }
  }

  return(
    <div className='main-container flex flex-col min-h-screen'>
      <div className='m-auto w-4/12 flex flex-col gap-2'>

        <div className='w-full'>
          <p className='px-2'>Почта</p>
          <DefaultInput value={email} setValue={(email) => setEmail(email)} isInvalid={invalidArray[0]} onChange={() => valueChanged(0)}/>
        </div>

        <div>
          <p className='px-2'>Пароль</p>
          <PasswordInput value={password} setValue={(password) => setPassword(password)} isInvalid={invalidArray[1]}
                          onChange={() => valueChanged(1)}/>
        </div>

        <button className='rounded-xl bg-gray-100 hover:bg-gray-200 w-full p-3 mt-3' onClick={handleEnter}>
          Войти
        </button>
        <p className='text-red-600'>
          {message}
        </p>
      </div>
    </div>
  )
}