import {useEffect, useState} from "react";

export const HallPlace = ({checked, setChoice, color, row, place}) => {

  const [fullPlace, setPlace] = useState ([]);

  useEffect(() => {
    setPlace([row, place])
  }, [])

  return(
    <div>
    <button
      className={checked ?
        ` rounded w-4 h-4 outline-none ring ${color == 'cyan' ? 'bg-cyan-700 ring-cyan-400' : 'bg-blue-700 ring-blue-400'}`
        :
        `rounded w-4 h-4 outline-none hover:ring ${color == 'cyan' ? 'bg-cyan-700 hover:ring-cyan-400' : 'bg-blue-700 hover:ring-blue-400'}`}
      onClick={() => setChoice(fullPlace[0], fullPlace[1])}
      te-toggle="tooltip"
      te-html="true"
      te-placement="left"
      te-ripple-init
      te-ripple-color="light"
      title="<strong>fdsffd</strong>"
      type='button'
    ></button>
    </div>
  )
}