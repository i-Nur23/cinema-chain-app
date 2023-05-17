import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {OfficesAPI} from "../../../api";
import {ManagerAPI} from "../../../api/ManagerAPI";
import {InputsHandler} from "../../../utils/InputsHandler";
import {DefaultInput, PasswordInput} from "../../../components/Inputs";
import {MenuItem, Select} from "@mui/material";
import {SelectInput} from "../../../components/MUIStyles";
import {OperatorAPI} from "../../../api/OperatorAPI";

export const AddOperator = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(' ')
  const [invalidArray, setInvalidArray] = useState([false, false, false, false, false]);
  const [method, setMethod] = useState('ADD');
  const [title, setTitle] = useState('Новый оператор');

  useEffect(() => {

    if (id === -1) return;

    OperatorAPI.getOperatorById(id, token)
      .then(oper => {
        setName(oper.firstName);
        setSurName(oper.lastName);
        setNickname(oper.nickName);
        setMethod('UPDATE');
        setTitle('Данные оператора');
      })
      .catch(err => {
        if (err.response.status === 401) {
          navigate('/staff')
        }
      })
  },[])

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

      if (method === 'ADD') {
        if (!InputsHandler.isValidEmail(email)){
          setMessage('Неверный формат почты');
          return;
        }

        OperatorAPI.createOperator(name, surName, nickname, email, password, token)
          .then(_ => navigate('/staff/main/operators'))
          .catch(err => {
              if (err.response.status === 401){
                navigate('/staff')
              } else {
                setMessage('Ошибка. Попробуйте позже')
              }
            }
          )
      } else {

        OperatorAPI.updateOperator(id, surName, name, nickname, token)
          .then(_ => navigate('/staff/main/operators'))
          .catch(err => {
              if (err.response.status === 401){
                navigate('/staff')
              } else {
                setMessage('Ошибка. Попробуйте позже')
              }
            }
          )
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

  return(
    <div className='container mx-auto w-4/12 p-6 flex flex-col gap-6 rounded mt-10'>
      <p className='text-2xl text-center'>{title}</p>
      <div className='w-full'>
        <p className='px-2'>Имя</p>
        <DefaultInput value={name} setValue={setName} isInvalid={invalidArray[0]} onChange={() => valueChanged(0)}/>
      </div>
      <div>
        <p className='px-2'>Фамилия</p>
        <DefaultInput value={surName} setValue={setSurName} isInvalid={invalidArray[1]} onChange={() => valueChanged(1)}/>
      </div>
      {method === 'ADD' &&
        <div>
          <p className='px-2'>Email</p>
          <DefaultInput value={email} setValue={setEmail} isInvalid={invalidArray[2]} onChange={() => valueChanged(2)}/>
        </div>
      }
      <div>
        <p className='px-2'>Никнейм</p>
        <DefaultInput value={nickname} setValue={setNickname} isInvalid={invalidArray[3]} onChange={() => valueChanged(3)}/>
      </div>
      { method === 'ADD' &&
        <div>
          <p className='px-2'>Пароль</p>
          <PasswordInput value={password} setValue={setPassword} isInvalid={invalidArray[4]}
                         onChange={() => valueChanged(4)}/>
        </div>
      }
      <div>
        <p className="text-red-700 font-light">
          {message}
        </p>
      </div>
      <button className="bg-gray-200 rounded-lg p-4" onClick={HandleReg}>
        Сохранить
      </button>
    </div>
  )
}