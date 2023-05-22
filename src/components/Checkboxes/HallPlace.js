import {useEffect, useState} from "react";

export const HallPlace = ({index, checked, setChoice, color, row, place}) => {

  const [fullPlace, setPlace] = useState ([]);

  useEffect(() => {
    setPlace([row, place])
  }, [])

  return(
    <div>
    <button
      className={checked ?
        `text-xs text-white rounded w-5 h-5 outline-none ring ${color == 'cyan' ? 'bg-cyan-700 ring-cyan-400' : 'bg-blue-700 ring-blue-400'}`
        :
        `text-xs text-white rounded w-5 h-5 outline-none hover:ring ${color == 'cyan' ? 'bg-cyan-700 hover:ring-cyan-400' : 'bg-blue-700 hover:ring-blue-400'}`}
      onClick={() => setChoice(fullPlace[0], fullPlace[1])}
      data-tooltip-target={`tooltip-${index}`}
      type="button"
    >{place + 1}</button>
      <div id={`tooltip-${index}`} role="tooltip" className='absolute z-50 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700'>
        {place + 1}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  )
}