import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

export const Seance = ({seance, index}) => {

  const Seance = styled.div`
    border: 2px solid hsla(${seance.film.color}, 100%, 70%, 0.8);
    border-radius: 0.5rem;
    font-size: 0.75rem;
    line-height: 1rem;
    padding: 1rem;
    background-color: hsla(${seance.film.color}, 100%, 30%, 0.8);
    text-align: center;
    color : white;
    height: 75px;
    width : ${() => `${seance.film.duration + 20}px`};
    margin-top : auto;
    margin-bottom: auto;
  `;

  //const className = `border-2 rounded-lg p-4 bg-${seance.film.color}-400 border-${seance.film.color}-800`;

  return(
    <Draggable
      draggableId={seance.id}
      index={index}
    >
      {(provided) => (
        <Seance
          /*className={`border-2 text-xs rounded-lg p-4 bg-${seance.film.color}-400 border-${seance.film.color}-800`}*/
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {seance.film.name}
          {seance.cost}
        </Seance>
      )}
    </Draggable>
  )
}