import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Tooltip} from "@mui/material";

const SeanceInTable = styled.div`
    border-right: 1px solid white;
    border-left: 1px solid white;
    font-size: 0.75rem;
    line-height: 1rem;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: hsla(${(props) => props.seance.film.color}, 100%, 30%, 0.8);
    text-align: center;
    color : white;
    height: 75px;
    width : ${(props) => `${(props.seance.film.duration + 20) * 2.5}px`};
    margin-top : auto;
    margin-bottom: auto;
    position: relative;
    display: flex;
    flex-direction: column;
  `;

export const Seance = ({seance, index, deleteItem, changePrice}) => {

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

  return(
    <Draggable
      draggableId={seance.id}
      index={index}
    >
      {(provided) => (
        <Tooltip placement="top" title={`${seance.film.duration}+20 мин.`}>
          <SeanceInTable
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
            {seance.film.name}
            <button
              className='absolute top-0 right-0' style={{color: `hsla(${seance.film.color}, 100%, 70%, 0.8)`}}
              onClick={() => deleteItem(seance.id)}
            >
              <XMarkIcon className='w-5 h-5'/>
            </button>
            <div className='flex justify-center gap-2 mx-auto'>
              <input
                id={`seance-${seance.id}`}
                className='text-xs text-black w-1/4 rounded p-1 focus:ring-0 focus:border-black'
                type='text'
                value={seance.cost}
                placeholder={'цена'}
                onInput={e => {
                  changePrice(e, seance.id)
                    .then(_ => document.getElementById(`seance-${seance.id}`).focus());
                }}
              />
              <p className='my-auto'>руб.</p>
            </div>
          </SeanceInTable>
        </Tooltip>
      )}
    </Draggable>
  )
}