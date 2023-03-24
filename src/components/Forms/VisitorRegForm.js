import {useState} from "react";
import {DateInput, DefaultInput, PasswordInput} from "../Inputs";

export  const  VisitorRegForm = ({onTypeChange}) => {
  const [message, setMessage] = useState(' ')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [password, setPassword] = useState('')



  return (
    <div className='container mx-auto w-4/12 p-6 flex flex-col gap-6 rounded mt-10'>
      <p className='text-2xl text-center'>Новая учетная запись</p>

      <div>

      </div>
      <div className='w-full'>
        <p className='px-2'>Имя</p>
        <DefaultInput value={name} setValue={setName}/>
      </div>
      <div>
        <p className='px-2'>Фамилия</p>
        <DefaultInput value={surname} setValue={setSurname}/>
      </div>
      <div>
        <p className='px-2'>Дата рождения</p>
        <DateInput value={birthdate} setValue={setBirthdate}/>
      </div>
      <div className='w-full'>
        <p className='px-2'>Email</p>
        <DefaultInput value={email} setValue={setEmail}/>
      </div>
      <div>
        <p className='px-2'>Пароль</p>
        <PasswordInput value={password} setValue={setPassword}/>
      </div>

      <button className="bg-gray-200 rounded-lg p-4" onClick={() => {}}>
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