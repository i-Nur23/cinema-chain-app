import {useState} from "react";

export const PasswordInput = ({value, setValue, placeholder, isInvalid, onChange}) => {

  const [passwordType, setPasswordType] = useState("password");

  return(
    <div>
      <div className='relative'>
        <input
          type={passwordType}
          value={value}
          className="w-full p-2 border border-gray-300 focus:border-gray-400 rounded-lg focus:ring focus:ring-gray-100 focus:outline-none invalid:border-red-700"
          placeholder={placeholder}
          onChange={e => setValue(e.target.value)}
          aria-invalid={isInvalid}
          onInvalid={e => e.target.setCustomValidity('Заполните это поле')}
          onInput={e => {
            e.target.setCustomValidity('');
            onChange();
          }}
        />
        <button onClick = {() => setPasswordType(passwordType == "password" ? "text" : "password")}>
        <span className="material-symbols-outlined absolute right-1 top-2 my-auto block">
        {passwordType == "password" ? "visibility_off" : "visibility" }
        </span>
        </button>
      </div>
      {isInvalid && <span className='text-red-600 text-sm'>Это обязательное поле</span>}
    </div>
  )
}