import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AuthAPI} from "../../api/AuthAPI";
import {authorize} from "../../store/slicers/AuthSlicer";
import {DefaultInput, PasswordInput} from "../../components/Inputs";

export const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [message, setMessage] = useState('');

  const [invalidArray, setInvalidArray] = useState([false, false, false]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token)


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
      if (newPassword != repPassword){
        setMessage('Вы ввели разные новые пароли');
        return;
      }

      var response = await AuthAPI.ChangePassword(token, oldPassword, newPassword);
      if (!response.ok){
        if (response.status == 401){
          navigate('/authorization')
        } else {
          setMessage(response.data.description);
        }
      } else {
        navigate('/user/profile')
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
    <div className='container mx-auto w-4/12 p-6 flex flex-col gap-6 rounded mt-10'>
      <p className='text-2xl text-center'>Профиль</p>
      <div className='w-full'>
        <p className='px-2'>Старый пароль</p>
        <PasswordInput value={oldPassword} setValue={setOldPassword} isInvalid={invalidArray[0]} onChange={() => valueChanged(0)}/>
      </div>
      <div>
        <p className='px-2'>Новый пароль</p>
        <PasswordInput value={newPassword} setValue={setNewPassword} isInvalid={invalidArray[0]} onChange={() => valueChanged(1)}/>
      </div>
      <div>
        <p className='px-2'>Повторите новый пароль</p>
        <PasswordInput value={repPassword} setValue={setRepPassword} isInvalid={invalidArray[0]} onChange={() => valueChanged(2)}/>
      </div>
      <div>
        <p className="text-red-700 font-light">
          {message}
        </p>
      </div>
      <button className="bg-gray-200 rounded-lg p-4" onClick={HandleSave}>
        Сменить пароль
      </button>
    </div>
  )
}