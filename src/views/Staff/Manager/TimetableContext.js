import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useEffect, useState} from "react";
import {FilmsAPI, OfficesAPI} from "../../../api";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {HallTimeline} from "./HallTimeline";
import {AvailableFilmsColumn} from "./AvailableFilmsColumn";

export const TimetableContext = ({day}) => {

  const token = useSelector(state => state.auth.token);
  const branchOfficeId = useSelector(state => state.auth.branchOfficeId)
  const navigate = useNavigate();

  const _table = {
    seances : {},
    halls: {
      '0' : {
        id : '0',
        seanceIds: []
      },
      '1': {
        id:'1',
        title:'Зал №1',
        seanceIds: []
      },
      '2': {
        id:'2',
        title:'Зал №2',
        seanceIds: []
      },
      '3': {
        id:'3',
        title:'Зал №3',
        seanceIds: []
      },
    },
    hallsOrder: [1, 2, 3]
  }


  /*const colors = ['red', 'yellow', 'lime', 'sky', 'violet', 'pink', 'orange', 'green', 'teal',
                  'cyan', 'indigo', 'purple', 'rose', 'amber', 'emerald', 'blue', 'fuchsia'];*/
  const [table, setTable] = useState(_table);
  //const [availableFilms, setAvailableFilms] = useState([]);
  //const [halls, setHalls] = useState(null)
  const [freeId ,setFreeId] = useState(-1);

  useEffect(() => {
    let availableId = 0;
    let seances = {};
    FilmsAPI.getFilmsToStartPage().then(resData => {
      const films = resData.filmList;
      const step = 340 / films.length;
      let currentColor = 0;
      films.forEach((film, index) => {
        --availableId;
        seances = {
          ...seances,
        [availableId.toString()] : { id : availableId.toString() , film : { id : film.id, name : film.name,
            duration: 90 + index * 10 ,color :  currentColor}
        }}
        currentColor += step;
      })
      console.log(seances);
      setFreeId(--availableId);
      setTable({
        ...table,
        seances: seances,
        halls : {
          ...table.halls,
          0 : {
            ...table.halls[0],
            seanceIds: Array.from(Object.keys(seances))
          }
        }
      })
    });
    /*OfficesAPI.getDeatilInfoAboutBranchOffice(branchOfficeId, token)
      .then(office => setHalls())
      .catch(err => { if (err.response.status === 401) navigate('/staff') })*/
  },[])

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const start = table.halls[source.droppableId];
    const finish = table.halls[destination.droppableId];

    if (start === finish) {

      if (start.id === '0') return;

      const newSeanceIds = Array.from(start.seanceIds);

      newSeanceIds.splice(source.index, 1);
      newSeanceIds.splice(destination.index, 0, draggableId);

      const newHall = {
        ...start,
        seanceIds: newSeanceIds
      };

      setTable({
        ...table,
        halls: {
          ...table.halls,
          [newHall.id]: newHall
        }
      });

      return;
    }

    // Move from one list to another
    const startSeanceIds = Array.from(start.seanceIds);

      startSeanceIds.splice(source.index, 1);
    /*{
      setTable(
        {
          ...table,
          halls: {
            ...table.halls,
            "0" : {
              ...table.halls["0"],
              [freeId] :
            }
          }
        }
      )
    }*/
    let newStart;
    let newSeances = table.seances;

    if (start.id !== '0'){
      newStart = {
        ...start,
        seanceIds: startSeanceIds
      };
    } else {
      const newSeance = {
          ...table.seances[draggableId],
          id : freeId.toString()
        }


      newSeances = {
        ...newSeances,
        [freeId.toString()] : newSeance
      }
      console.log(table.seances)
      //const newSeanceIds = [...startSeanceIds, freeId.toString()]
      startSeanceIds.splice(source.index, 0, freeId.toString())

      newStart = {
        ...start,
        seanceIds : startSeanceIds
      }

      setFreeId(freeId - 1);

    }

    const finishSeanceIds = Array.from(finish.seanceIds);
    if (finish.id !== '0'){
      finishSeanceIds.splice(destination.index, 0, draggableId);
    }
    const newFinish = {
      ...finish,
      seanceIds: finishSeanceIds
    };

    const newState = {
      ...table,
      seances: newSeances,
      halls: {
        ...table.halls,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    console.log(newState)

    setTable(newState);
  }

  return(
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex divide-x'>
        <div className='p-2 w-1/6'>
          <AvailableFilmsColumn seances={table.halls[0].seanceIds.map((seanceId) => table.seances[seanceId])}/>
        </div>
        <div className='border-collapse p-2 w-5/6 overflow-x-auto'>
          <p className='font-semibold mb-6'>Залы</p>
          {
            table.hallsOrder.map((hallId, index) => {
              const hall = table.halls[hallId];
              const seances = hall.seanceIds.map((seanceId) => table.seances[seanceId])
              return <HallTimeline hall={hall} seances={seances}/>
            })
          }
        </div>

      </div>
    </DragDropContext>
  )
}