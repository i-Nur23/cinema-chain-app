import {Droppable} from "react-beautiful-dnd";
import {Seance} from "./Seance";
import styled from "styled-components";

export const HallTimeline = ({hall, seances}) => {

  const SeancesContainer = styled.div`
    display: flex;
    gap: 0.75rem;
    flex-grow: 1;
    background-color: ${(props) => props.isDraggingOver ? 'lightgray' : 'white'};
  `

  return(
      <div className=' flex gap-3 border-b min-h-[100px]'>
        <p className='my-auto min-w-[60px]'>{hall.title}</p>
        <Droppable
          droppableId={hall.id}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <SeancesContainer
              //className='flex gap-3 flex-grow'
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {
                seances.map((seance, index) => (
                  <Seance key={seance.id} seance={seance} index={index}/>
                ))
              }
              {provided.placeholder}
            </SeancesContainer>)}
        </Droppable>
      </div>
  )
}