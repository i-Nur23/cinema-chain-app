import {SessionCard} from "../Cards";


export const TheatreSession = ({theatre}) => {
  return (
    <li className='flex justify-between py-5 border-b'>
      <p className='text-xl'>{theatre.kinotheatre.name}</p>
      <div className='grid grid-cols-3 gap-4'>
        {theatre.sessions.map(session => (
          <SessionCard session={session}/>
        ))}
      </div>
    </li>
  )
}