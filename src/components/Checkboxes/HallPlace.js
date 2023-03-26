import {useEffect, useState} from "react";

export const HallPlace = ({checked, setChoice, color, row, place}) => {

  const [fullPlace, setPlace] = useState ([]);
  const [style, setStyle] = useState();

  useEffect(() => {
    setPlace([row, place])
    setStyle(checked ?
      'rounded w-5 h-5 outline-none bg-'+color+'-700 ring-'+color+'-600'
        :
      'rounded w-5 h-5 outline-none bg-'+color+'-700 hover:ring-'+color+'-600'
    )
  }, [])

  return(
    <button
      className={style}
      //className='rounded bg-black w-5 h-5'
      //onClick={() => setChoice(fullPlace[0], fullPlace[1])}
    ></button>
  )
}