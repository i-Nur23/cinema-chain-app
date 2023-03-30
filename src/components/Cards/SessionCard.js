import {useState, Fragment, useEffect} from "react";
import {Transition} from "@headlessui/react";
import {TicketChoiceDialog} from "../Dialogs";

export const SessionCard = ({seance}) => {
  const [isOpen, setOpen] = useState(false)
  const [session, setSession] = useState(null)

  useEffect(() => {
    console.log(seance)
    setSession(seance);
  }, [seance])

  let content = !session ? null :
    <div key={seance.id}>
      <div className='relative'>
        <button
          className='border border-gray-200 rounded-lg py-1 px-9 hover:border-gray-700 hover:shadow hover:drop-shadow-2xl ease-in-out duration-200'
          onClick={() => setOpen(true)}
        >
          <p>{`${session.seanceStartTime.substring(0,2)}:${session.seanceStartTime.substring(3,5)}`}</p>
          <p className='text-gray-400'>{`от ${session.basicCost}`}</p>
        </button>
        <div className='px-1 absolute top-0 right-0 bg-cyan-600 text-white text-sm rounded-tr rounded-bl'>
          {session.type}
        </div>
      </div>

      <Transition.Root appear show={isOpen} as={Fragment}>
        <div>
          <TicketChoiceDialog close={() => setOpen(false)} basePrice={session.basicCost}/>
        </div>
      </Transition.Root>
    </div>


  return(
    content
  )
}