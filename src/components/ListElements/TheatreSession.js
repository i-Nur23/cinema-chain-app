import {SessionCard} from "../Cards";
import {useEffect, useState} from "react";


export const TheatreSession = ({theater, table}) => {

  const [seances, setSeances] = useState()
  const [theaterName, setTheaterName] = useState();
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    console.log('Here')
    setSeances(table)
    setTheaterName(theater)
    setLoaded(true)
  },[table])

  let content = !loaded ? null :
    <div className='flex justify-between'>
      <p className='text-xl'>{theaterName}</p>
      <div className='grid grid-cols-3 gap-4'>
        {seances.map(session => (
          <SessionCard seance={session}/>
        ))}
      </div>
    </div>

  return ( content )
}