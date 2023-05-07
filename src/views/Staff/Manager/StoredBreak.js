import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import {useMemo, useState} from "react";

const Seance = styled.div`
    border: 2px solid lightgray;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 1rem;
    background-color: darkgray;
    text-align: center;
    color : white;
    height: 75px;
    display: flex;
    flex-direction: column;
  `;

export const StoredBreak = ({seance, index}) => {

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
        <Seance
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          onTouchEnd={() => {
            onTouchEnd(
              provided.draggableProps.onTransitionEnd
            );
          }}
        >
          Перерыв
          {/*<input
            className='rounded p-2 text-black'
            key={id}
            placeholder="Время"
            value={interval}
            onChange={(e) => {setInterval(e.target.value)}}
          />*/}
          {/*<DurationInput/>*/}
        </Seance>
      )}
    </Draggable>
  )
}