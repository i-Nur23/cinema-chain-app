import {useState} from "react";

export const PasswordInput = ({value, setValue, placeholder}) => {

  const [passwordType, setPasswordType] = useState("password");

  return(
    <div className='relative'>
      <input
        type={passwordType}
        value={value}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-100 focus:outline-none invalid:border-red-700"
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
        onInvalid={e => e.target.setCustomValidity('Заполните это поле')}
        onInput={e => e.target.setCustomValidity('')}
      />
      <button onClick = {() => setPasswordType(passwordType == "password" ? "text" : "password")}>
        <span className="material-symbols-outlined absolute right-1 top-2 my-auto block">
        {passwordType == "password" ? "visibility_off" : "visibility" }
      </span>
      </button>
    </div>
  )
}