import {Droppable} from "react-beautiful-dnd";
import {Seance} from "./Seance";
import {AvailableFilm} from "./AvailableFilm";

export const AvailableFilmsColumn = ({seances}) => {

  return(
    <div>
      <p className='text-center font-semibold mb-6'>Доступные фильмы</p>
      <Droppable
        droppableId={"0"}
      >
        {(provided) => (
          <div
            className='flex flex-col gap-3'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {
              seances.map((seance, index) => (
                  <AvailableFilm key={seance.id} seance={seance} index={index}/>
              ))
            }
            {provided.placeholder}
          </div>)}
      </Droppable>
    </div>
  )
}