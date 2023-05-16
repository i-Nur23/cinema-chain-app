import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import {CheckIcon, ChevronUpDownIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {Tooltip} from "@mui/material";

const Seance = styled.div`
    border-right: 1px solid white;
    border-left: 1px solid white;
    font-size: 0.75rem;
    line-height: 1rem;
    padding-top: 0.5rem;
    background-color: darkgray;
    text-align: center;
    color : white;
    height: 75px;
    width : ${(props) => `${props.seance.film.duration * 2.5}px`};
    margin-top : auto;
    margin-bottom: auto;
    position: relative;
    &:hover {
      background-color: #8c8c8c;
    };
  `;

export const BreakInTable = ({seance, index, deleteItem, changeBreakDuration}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const handleClose = () => {
    setTooltipOpen(false);
  };

  const handleOpen = () => {
    setTooltipOpen(true);
  };

  const onTouchEnd = (onTransitionEnd) => {
    const { toggleIsDragging } = this.props;
    if (onTransitionEnd) {
      setTimeout(() => {
        onTransitionEnd({
          propertyName: 'transform',
        });
      }, 330);
    } else {
      toggleIsDragging(false);
    }
  }

  /*const DurationField = () => {
    const [duration, setDuration] = useState(seance.film.duration);

    return(
      <div className='flex justify-center gap-1 mx-auto flex-wrap'>
        <input
          id={`seance-${seance.id}`}
          className='text-xs text-black w-10 rounded p-1 focus:ring-0 focus:border-black'
          type='text'
          value={duration}
          placeholder={'длительность'}
          onChange = { e => setDuration(e.target.value)}
        />
        <CheckIcon className='w-5 h-5 my-auto text-white cursor-pointer'
                   onClick={() => changeBreakDuration(duration, seance.id)}
        />
      </div>
    )
  }*/

  const UpdateDialog = ({currentDuration}) => {
    const [newDuration, setNewDuration] = useState();

    useEffect(() => {
      setNewDuration(currentDuration);
    },[])

    return(
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"/>
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="z-50 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="z-50 text-lg font-medium leading-6 text-gray-900"
                  >
                    Выберите действие
                  </Dialog.Title>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className='flex flex-col gap-3'>
                      <div className='flex justify-between gap-1'>
                        <input
                          type='text'
                          value={newDuration}
                          onChange={e => setNewDuration(e.target.value)}
                          className='border w-5/6 rounded-lg p-3 focus:outline-none focus:ring-0 focus:border-gray-500'
                        />
                        <p className='my-auto'>мин.</p>
                      </div>
                      <button
                        className='p-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-200 ease-in-out duration-100'
                        onClick={() => {
                          changeBreakDuration(newDuration, seance.id)
                          setIsOpen(false);
                        }}
                      >
                        Сохранить
                      </button>
                    </div>
                    <button
                      className='p-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-200 ease-in-out duration-100'
                      onClick={() => {
                        deleteItem(seance.id);
                        setIsOpen(false);
                      }}
                    >
                      Убрать
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }

  return (
    <Draggable
      draggableId={seance.id}
      index={index}
    >
      {(provided) => (
          <Seance
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            onTouchEnd={() => {
              onTouchEnd(
                provided.draggableProps.onTransitionEnd
              );
            }}
            seance={seance}
            onContextMenu={e => {
              e.preventDefault();
              setIsOpen(true)
            }}
          >
            <p>Перерыв</p>
            <p>{seance.film.duration}</p>
            <UpdateDialog currentDuration={seance.film.duration}/>
          </Seance>
      )}

    </Draggable>
  )
}