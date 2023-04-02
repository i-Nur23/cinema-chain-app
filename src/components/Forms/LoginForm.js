import {useState} from "react";
import {DefaultInput, PasswordInput} from "../Inputs";

export const LoginForm = () => {
  const [message, setMessage] = useState(' ')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  return (
    <div className='container p-6 flex flex-col gap-6 rounded'>
      <p className='text-2xl text-center'>Вход</p>

      <div className='w-full'>
        <p className='px-2'>Email</p>
        <DefaultInput value={email} setValue={setEmail}/>
      </div>

      <div className='w-full'>
        <p className='px-2'>Пароль</p>
        <PasswordInput value={password} setValue={setPassword} />
      </div>

      <div>
        <button className="bg-gray-200 rounded-lg p-4 w-full" onClick={() => {}}>
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