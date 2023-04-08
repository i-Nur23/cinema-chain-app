import {useState} from "react";

export const DefaultInput = ({value, placeholder ,setValue, isInvalid, onChange}) => {

  return(
    <div>
      <input
        type="text"
        value={value}
        className="w-full p-2 border border-gray-300 focus:border-gray-400 rounded-lg focus:ring focus:ring-gray-100 focus:outline-none invalid:border-red-700 focus:invalid:border-red-700"
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
        onInvalid={e => e.target.setCustomValidity('Заполните это поле')}
        onInput={e => {e.target.setCustomValidity(''); onChange()}}
      />
      {isInvalid && <span className='text-red-600 text-sm'>Это обязательное поле</span>}
    </div>
  )
}