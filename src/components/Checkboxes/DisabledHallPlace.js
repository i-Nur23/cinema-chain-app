import {useEffect, useState} from "react";

export const DisabledHallPlace = ({place}) => {

  return(
    <div>
    <button
        className='text-white text-xs h-5 w-5 outline-none rounded bg-gray-400'
        title="<strong>fdsffd</strong>"
        disabled={true}
    >{place + 1}</button></div>
  )
}