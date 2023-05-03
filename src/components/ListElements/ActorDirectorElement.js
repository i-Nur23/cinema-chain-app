import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ArrowUturnLeftIcon, PencilIcon, PencilSquareIcon, XMarkIcon} from "@heroicons/react/24/outline";

export const ActorDirectorElement = ({id, firstName, lastName, onDelete, onSave }) => {

  const [oldName, setOldName] = useState('');
  const [oldSurname, setOldSurname] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setOldName(firstName);
    setOldSurname(lastName);
    setName(firstName);
    setSurname(lastName);
  },[])

  return(
    <li className="p-3 border-b">
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <input
            className='p-2 border rounded-lg disabled:border-white disabled:bg-white focus:outline-none'
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={isDisabled}
          />
          <input
            className='p-2 border rounded-lg disabled:border-white disabled:bg-white focus:outline-none'
            value={surname}
            onChange={e => setSurname(e.target.value)}
            disabled={isDisabled}
          />
        </div>
        <div className='flex gap-5'>
          {
            isDisabled ?
              <button>
                <PencilIcon className='w-6 h-6 my-auto hover:text-blue-400' onClick={() => setIsDisabled(false)}/>
              </button>
              :
              <div className='flex my-auto gap-5'>
                <button className='flex flex-col justify-center'>
                  <span className="material-symbols-outlined w-6 h-6 my-auto hover:text-green-500" onClick={() => {
                    onSave(id, name, surname);
                    setIsDisabled(true)
                  }}>
                    save
                  </span>
                </button>
                <button>
                  <ArrowUturnLeftIcon className='w-6 h-6 my-auto hover:text-purple-500' onClick={() => {
                    setIsDisabled(true);
                    setSurname(oldSurname);
                    setName(oldName);
                  }}/>
                </button>
              </div>
          }
          <XMarkIcon
            className='w-6 h-6 my-auto cursor-pointer hover:text-red-500'
            onClick={() => onDelete(id)}
          />
        </div>
      </div>
    </li>
  )
}