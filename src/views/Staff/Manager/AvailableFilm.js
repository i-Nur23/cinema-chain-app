import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

const Seance = styled.div`
    border: 2px solid hsla(${(props) => props.seance.film.color}, 100%, 70%, 0.8);
    border-radius: 0.5rem;
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 1rem;
    background-color: hsla(${(props) => props.seance.film.color}, 100%, 30%, 0.8);
    text-align: center;
    color : white;
    height: 75px;
  `;

export const AvailableFilm = ({seance, index}) => {

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
      draggableId={seance.id.toString()}
      index={index}
    >
      {(provided) => (
        <Seance
          className={`border-2 text-xs rounded-lg p-4 bg-${seance.film.color}-400 border-${seance.film.color}-800`}
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
        </Seance>
      )}
    </Draggable>
  )
}