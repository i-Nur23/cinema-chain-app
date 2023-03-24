export const DefaultInput = ({value, placeholder ,setValue}) => {

  return(
    <input
      type="text"
      value={value}
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-100 focus:outline-none invalid:border-red-700"
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
      onInvalid={e => e.target.setCustomValidity('Заполните это поле')}
      onInput={e => e.target.setCustomValidity('')}
    />
  )
}