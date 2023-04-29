import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AuthAPI} from "../../../api/AuthAPI";
import {authorize} from "../../../store/slicers/AuthSlicer";
import {DefaultInput, PasswordInput} from "../../../components/Inputs";
import {MenuItem, Select} from "@mui/material";
import {SelectInput} from "../../../components/MUIStyles";

export const AddManager = () => {

  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(' ')
  const [invalidArray, setInvalidArray] = useState([false, false, false, false, false]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [offices, setOffices] = useState([
    {
      id : 1,
      name : 'вавпфавпфвва',
    },
    {
      id : 2,
      name : 'fsdgfadlk;',
    },
    {
      id : 3,
      name : 'y72398r09iepwforgkl;,bg',
    },
    {
      id : 4,
      name : 'sadssadasad[]a[f[ewf',
    },
    ]
  )

  const [officeId, setOfficeId] = useState(offices[0].id);

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
      <p className='text-2xl text-center'>Новый менеджер</p>
      <div className='w-full'>
        <p className='px-2'>Имя</p>
        <DefaultInput value={name} setValue={setName} isInvalid={invalidArray[0]} onChange={() => valueChanged(0)}/>
      </div>
      <div>
        <p className='px-2'>Фамилия</p>
        <DefaultInput value={surName} setValue={setSurName} isInvalid={invalidArray[1]} onChange={() => valueChanged(1)}/>
      </div>
      <div>
        <p className='px-2'>Email</p>
        <DefaultInput value={email} setValue={setEmail} isInvalid={invalidArray[2]} onChange={() => valueChanged(2)}/>
      </div>
      <div>
        <p className='px-2'>Логин</p>
        <DefaultInput value={nickname} setValue={setNickname} isInvalid={invalidArray[3]} onChange={() => valueChanged(3)}/>
      </div>
      <div>
        <p className='px-2'>Пароль</p>
        <PasswordInput value={password} setValue={setPassword} isInvalid={invalidArray[4]} onChange={() => valueChanged(4)}/>
      </div>
      <div>
        <p className='px-2'>Филиал</p>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          input={<SelectInput/>}
          value={officeId}
          onChange={(e) => setOfficeId(e.target.value)}
        >
          {
            offices.map(office =>
              <MenuItem value={office.id}>
                {office.name}
              </MenuItem>
            )
          }
        </Select>
      </div>
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