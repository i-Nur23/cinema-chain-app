import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AuthAPI} from "../../../api/AuthAPI";
import {authorize} from "../../../store/slicers/AuthSlicer";
import {DefaultInput, PasswordInput} from "../../../components/Inputs";
import {FormControl, InputBase, InputLabel, MenuItem, Select, styled} from "@mui/material";

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

  const SelectInput = styled(InputBase)(({ theme }) => ({
    /*'label + &': {
      marginTop: theme.spacing(3),
    },*/
    width : '100%',
    '& .MuiInputBase-input': {
      borderRadius: '0.5rem',
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  }));

  return(
    <div className='container mx-auto w-4/12 p-6 flex flex-col gap-6 rounded mt-10'>
      <p className='text-2xl text-center'>Новая учетная запись</p>
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
          /* sx = {{
             borderColor : '#e5e7eb',
             borderRadius : '0.5rem',
             width : '100%',
             height : '3em',
             '&:hover' : {
               borderRadius : '0.5rem',
               border : '1px solid #e5e7eb',
             },
             '& .Mui-focusVisible' : {
               borderWidth : '0',
               borderColor : 'red',
             }
           }}*/
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
        </Select></div>
        {/*<select className='w-full rounded-lg border-gray-300 focus:border-gray-400 focus:ring-0'>
          {
            offices.map(office =>
              <option
                className='rounded'

              >
                {office.name}
              </option>
            )
          }
        </select>*/}
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