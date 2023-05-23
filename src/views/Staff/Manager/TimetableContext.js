import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useEffect, useState} from "react";
import {FilmsAPI, OfficesAPI} from "../../../api";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {HallTimeline} from "./HallTimeline";
import {AvailableFilmsColumn} from "./AvailableFilmsColumn";
import {DateHandler} from "../../../utils/DateHandler";
import {TimeHandler} from "../../../utils/TimeHandler";

export const TimetableContext = ({day, save, start, end}) => {

  const token = useSelector(state => state.auth.token);
  const [startTime, setStartTime] = useState(start);
  const [endTime, setEndTime] = useState(end);
  const [table, setTable] = useState(day.table);
  const [timeRow, setTimeRow] = useState([])
  //const [availableFilms, setAvailableFilms] = useState([]);
  //const [halls, setHalls] = useState(null)
  const [freeId ,setFreeId] = useState(day.freeId);
  const [deletedIds, setDeletedIds] = useState([]);

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
        timeLeft : 840,
        seanceIds: []
      },
      '2': {
        id:'2',
        title:'Зал №2',
        timeLeft : 840,
        seanceIds: []
      },
      '3': {
        id:'3',
        title:'Зал №3',
        timeLeft : 840,
        seanceIds: []
      },
    },
    hallsOrder: [1, 2, 3]
  }

  useEffect(() => {
    var row = [];
    for (let i = startTime; i <= endTime; i += 0.5){
      row.push(<div className='w-0 text-xs'>|{TimeHandler.toTimeString(i % 24)}</div>)
    }
    console.log('dsa')
    setTimeRow(row);

    /*setStartTime(start)
    setEndTime(end)
    setTable(day.table)
    setFreeId(day.freeId)*/

  },[])

  /*useEffect(() => {
    var row = [];
    for (let i = startTime; i <= endTime; i += 0.5){
      row.push(<div className='w-0 text-xs'>|{TimeHandler.toTimeString(i % 24)}</div>)
    }
    setTimeRow(row);

    if (day.table !== null) {
      setFreeId(Math.min(...Object.keys(day.table.seances).map(key => day.table.seances[key].id)) - 1);
      setTable(day.table);
      return;
    }

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
        [availableId.toString()] : { id : availableId.toString(), cost : 0, film : { id : film.id, name : film.name,
            duration: 90 + index * 10 ,color :  currentColor}
        }}
        currentColor += step;
      })

      --availableId;

      seances = {
        ...seances,
        [availableId.toString()] : { id : availableId.toString(), film : { id : 0, name : 'Перерыв', duration: 100, color : 20}
        }}

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
  },[])*/

  const deleteItem = (itemId, droppableId) => {

    const newSeanceIds = table.halls[droppableId].seanceIds.filter(id => id != itemId);
    if (itemId > 0){
      setDeletedIds([...deletedIds, itemId])
    }

    let _table = {
      ...table,
      halls : {
        ...table.halls,
        [droppableId] : {
          ...table.halls[droppableId],
          seanceIds : newSeanceIds,
          timeLeft : table.halls[droppableId].timeLeft + table.seances[itemId].film.duration + 20
        }
      }
    }

    setTable(_table)
  }

  const changePrice = async (e, id) => {
    const newCost = e.target.value;

    if (newCost !== '' && !/^\d+$/.test(newCost) ){
      return;
    }

    await setTable(
      {
        ...table,
        seances : {
          ...table.seances,
          [id] : {
            ...table.seances[id],
            cost : newCost
          }
        }
      }
    )
  }

  const changeBreakDuration = async (textNewDuration, hallId, id) => {
    if (!/^\d+$/.test(textNewDuration) ){
      return;
    }

    var newDuration = parseInt(textNewDuration);

    if (newDuration <= 0){
      newDuration = 5;
    } else {
      newDuration = Math.ceil(newDuration / 5) * 5
    }

    let newTimeLeft;

    if (newDuration - table.seances[id].film.duration > table.halls[hallId].timeLeft) {
      return;
    } else {
        newTimeLeft =  table.halls[hallId].timeLeft - ( newDuration - table.seances[id].film.duration);

    }

    await setTable(
      {
        ...table,
        seances : {
          ...table.seances,
          [id] : {
            ...table.seances[id],
            film : {
              ...table.seances[id].film,
              duration : newDuration
            }
          }
        },
        halls : {
          ...table.halls,
          [hallId] : {
            ...table.halls[hallId],
            timeLeft : newTimeLeft
          }
        }
      }
    )
  }

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const start = table.halls[source.droppableId];
    const finish = table.halls[destination.droppableId];

    console.log(start)
    console.log(finish)

    if (start === finish) {

      if (start.id === 0) return;

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

    if (finish.timeLeft < table.seances[draggableId].film.duration + 20) {
      return
    }

    startSeanceIds.splice(source.index, 1);

    let newStart;
    let newSeances = table.seances;

    if (start.id !== 0){
      newStart = {
        ...start,
        seanceIds: startSeanceIds,
        timeLeft : start.timeLeft + table.seances[draggableId].film.duration + (table.seances[draggableId].film.id === 0 ? 0 : 20),
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
    let newFinish;
    if (finish.id !== 0){
      finishSeanceIds.splice(destination.index, 0, draggableId);

      newFinish = {
        ...finish,
        seanceIds: finishSeanceIds,
        timeLeft : finish.timeLeft - table.seances[draggableId].film.duration - (table.seances[draggableId].film.id === 0 ? 0 : 20),

      };
    } else {
      newFinish = {
        ...finish,
        seanceIds: finishSeanceIds
      };
    }

    const newState = {
      ...table,
      seances: newSeances,
      halls: {
        ...table.halls,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };


    setTable(newState);
  }

  /*const onDragStart = start => {
    var newCost = document.getElementById(`seance-${start.draggableId}`)?.value;
    if (!newCost){
      setTable(
        {
          ...table,
          seances : {
            ...table.seances,
            [start.draggableId] : {
              ...table.seances[start.draggableId],
              cost : newCost
            }
          }
        }
      )
    }
  }*/

  return(
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex divide-x'>
        <div className='p-2 w-1/6'>
          <AvailableFilmsColumn seances={table.halls[0].seanceIds.map((seanceId) => table.seances[seanceId])}/>
        </div>
        <div className='border-collapse p-2 w-5/6 overflow-x-auto'>
          <p className='font-semibold mb-6'>Залы</p>
          <div className='flex gap-[75px] ml-[72px]'>
            {
              timeRow
            }
          </div>
          {
            table.hallsOrder.map((hallId, index) => {
              const hall = table.halls[hallId];
              const seances = hall.seanceIds.map((seanceId) => table.seances[seanceId])
              return <HallTimeline hall={hall} seances={seances} width={(endTime - startTime) * 150 + 72}
                                   deleteItem={(itemId, hallId) => deleteItem(itemId, hallId)}
                                   changePrice={changePrice}
                                   changeBreakDuration = {changeBreakDuration}
              />
            })
          }
        </div>
      </div>
      <button className='ml-2 p-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-800 w-32' onClick={() => save(table, deletedIds)}>
        Сохранить
      </button>
    </DragDropContext>
  )
}