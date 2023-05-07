import {Droppable} from "react-beautiful-dnd";
import {Seance} from "./Seance";
import styled from "styled-components";
import {BreakInTable} from "./BreakInTable";


const SeancesContainer = styled.div`
    display: flex;
    flex-grow: 1;
    background-color: ${(props) => props.isDraggingOver ? 'lightgray' : 'white'};
  `

const HallConatiner = styled.div`
    display: flex;
    gap : 12px;
    border-bottom: solid lightgray 1px;
    min-height: 120px;
    min-width : ${(props) => `${props.width}px`};
  `;

export const HallTimeline = ({hall, seances, width, deleteItem, changePrice, changeBreakDuration}) => {

  return(
      <HallConatiner width={width}>
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
                  seance.film.id !== 0
                    ? <Seance key={seance.id} seance={seance} index={index}
                              deleteItem={(itemId) => deleteItem(itemId, hall.id)}
                              changePrice={changePrice}
                      />
                    : <BreakInTable key={seance.id} seance={seance} index={index}
                                    deleteItem={(itemId) => deleteItem(itemId, hall.id)}
                                    changeBreakDuration={(newDuration, id) => changeBreakDuration(newDuration, hall.id, id)}
                      />
                ))
              }
              {provided.placeholder}
            </SeancesContainer>)}
        </Droppable>
      </HallConatiner>
  )
}