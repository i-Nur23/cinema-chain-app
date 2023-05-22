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
      type="button"
    >{place + 1}</button>
    </div>
  )
}