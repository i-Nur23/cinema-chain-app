export const DateInput = ({value, setValue}) => {
  return(
    <input
      value={value}
      type='date'
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-100 focus:outline-none invalid:border-red-700"
      onChange={e => setValue}
      onInvalid={e => e.target.setCustomValidity('Заполните это поле')}
      onInput={e => e.target.setCustomValidity('')}
    />
  )
}