import {useState, Fragment} from "react";
import {Transition} from "@headlessui/react";
import {TicketChoiceDialog} from "../Dialogs";

export const SessionCard = ({session}) => {
  const [isOpen, setOpen] = useState(false)

  return(
    <div>
      <div className='relative'>
        <button
          className='border border-gray-200 rounded-lg py-2 px-6 hover:border-gray-700 hover:shadow hover:drop-shadow-2xl ease-in-out duration-200'
          onClick={() => setOpen(true)}
        >
          <p>{`${session.time.getHours()}:${session.time.getMinutes()}`}</p>
          <p className='text-gray-400'>{`от ${session.initPrice}`}</p>
        </button>
        <div className='px-1 absolute top-0 right-0 bg-cyan-600 text-white text-sm rounded-tr rounded-bl'>
          {session.type}
        </div>
      </div>

      <Transition.Root appear show={isOpen} as={Fragment}>
        <div>
          <TicketChoiceDialog close={() => setOpen(false)}/>
        </div>
      </Transition.Root>


    </div>
  )
}