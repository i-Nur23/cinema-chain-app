import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import {CheckIcon, ChevronUpDownIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

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
  `;

export const BreakInTable = ({seance, index, deleteItem, changeBreakDuration}) => {

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

  const DurationField = () => {
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
  }

  return(
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
          >
            {`${seance.film.name}`}
            <button
              className='absolute top-0 right-0'
              onClick={() => deleteItem(seance.id)}
            >
              <XMarkIcon className='w-5 h-5'/>
            </button>
            <DurationField/>
          </Seance>
      )}
    </Draggable>
  )
}