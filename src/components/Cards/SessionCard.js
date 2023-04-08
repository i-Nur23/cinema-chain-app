import {useState, Fragment, useEffect} from "react";
import {Transition} from "@headlessui/react";
import {TicketChoiceDialog} from "../Dialogs";

export const SessionCard = ({seance}) => {
  const [isOpen, setOpen] = useState(false)
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(seance);
  }, [seance])

  let content = !session ? null :
    <div key={seance.id}>
      <div className='relative'>
        <button
          className='border border-gray-200 rounded-lg py-1 px-10 hover:border-gray-700 hover:shadow hover:drop-shadow-2xl ease-in-out duration-200'
          onClick={() => setOpen(true)}
          data-tooltip-target="tooltip-default"
        >
          <p>{`${session.seanceStartTime.substring(0,2)}:${session.seanceStartTime.substring(3,5)}`}</p>
          <p className='text-gray-400'>{`от ${session.basicCost}`}</p>
        </button>
        <div id="tooltip-default" role="tooltip"
             className="absolute z-10 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Tooltip content
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        <div className='px-1 absolute top-0 right-0 bg-cyan-600 text-white text-sm rounded-tr rounded-bl'>
          {session.type}
        </div>
      </div>

      <Transition.Root appear show={isOpen} as={Fragment}>
        <div>
          <TicketChoiceDialog close={() => setOpen(false)} basePrice={session.basicCost} id={session.id}/>
        </div>
      </Transition.Root>
    </div>


  return(
    content
  )
}