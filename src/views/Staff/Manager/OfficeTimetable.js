import {useEffect, useState} from "react";
import {FilmsAPI} from "../../../api";
import {Tab} from "@headlessui/react";
import {TimetableContext} from "./TimetableContext";
import {useSelector} from "react-redux";
import {SeanceAPI} from "../../../api/SeanceAPI";
//import * as fs from "fs";

export const OfficeTimetable = () => {

  const [days, setDays] = useState([]);
  const officeId = useSelector(state => state.auth.branchOfficeId);
  const [startTime, setStartTime] = useState(5);
  const [endTime, setEndTime] = useState(23);
  const [loaded, setLoaded] = useState(false)

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    /*let date = new Date();
    date.setDate(date.getDate() + 1);
    let datesArray = []
    Array.from({length : 7}, (_, index) => {
      datesArray.push({date : new Date(date), table : null});
      date.setDate(date.getDate() + 1)
    })

    setDays(datesArray);*/
    (
      async () => {
        var finishTable = [];

        await SeanceAPI.getTimetableForWeek(officeId)
          .then(officeTimetable => {
            FilmsAPI.getFilmsToStartPage().then(resData => {
              setStartTime(officeTimetable.startTime);
              setEndTime(officeTimetable.endTime < 5 ? 24 + officeTimetable.endTime : officeTimetable.endTime);
              var initTable = officeTimetable.fullList;
              var hallOrder = officeTimetable.fullList[0].halls.map(hall => hall.id);
              var timeLeft = 60 * ((officeTimetable.endTime < 5 ? 24 + officeTimetable.endTime : officeTimetable.endTime) - officeTimetable.startTime);

              initTable.forEach(table => {
                var day = {}
                day.date = new Date(table.date);
                day.freeId = table.maxFreeId
                day.table = {
                  hallsOrder : [],
                  seances : {},
                  halls : {}
                };

                day.table.hallsOrder = hallOrder;

                var seances = {};
                var availableId = table.maxFreeId;
                var filmColors = {};


                const films = resData.filmList;
                const step = 340 / films.length;
                let currentColor = 0;
                films.forEach((film, index) => {
                  seances = {
                    ...seances,
                    [availableId.toString()] : { id : availableId.toString(), cost : 0, film : { id : film.id, name : film.name,
                        duration: 90 + index * 10 ,color :  currentColor}
                    }}

                  filmColors[film.name] = currentColor
                  currentColor += step;
                  --availableId;
                })

                --availableId;

                seances = {
                  ...seances,
                  [availableId.toString()] : { id : availableId.toString(), film : { id : 0, name : 'Перерыв', duration: 100, color : 20}
                  }}

                filmColors['Перерыв'] = 20

                day.table.halls['0'] = {
                  id : 0,
                  seanceIds : Object.keys(seances).map(s => parseInt(s))
                }


                table.halls.forEach(hall => {
                  day.table.halls[hall.id.toString()] = {
                    id : hall.id,
                    title : `Зал №${hall.hallNumber}`,
                    timeLeft : timeLeft - hall.seances.reduce((accumulator, current) => {
                      return accumulator + current.film.duration;
                    }, 0),
                    seanceIds : hall.seances.map(s => s.id)
                  }

                  hall.seances.forEach(seance => {

                    var _seance = {
                      ...seance,
                      film : {
                        ...seance.film,
                        color : filmColors[seance.film.name]
                      }
                    }

                    seances[seance.id.toString()] = _seance
                  })

                  day.table.seances = seances;
                })

                finishTable.push(day)

              })

            });

            console.log(1)
            setDays(finishTable)
            setLoaded(true);
            })
      }
    )()
  },[])

  const compareDates = (d1, d2) => {
    return d1.date.getDate() - d2.date.getDate();
  }

  const save = (date, table) => {
    let oldDay = days.find (day => day.date === date);
    oldDay.table = table;
    //console.log([...days.filter(day => day.date !== date), oldDay].sort(compareDates));

    setDays([...days.filter(day => day.date !== date), oldDay].sort(compareDates));

    var body = {};

    body.date = date;
    body.branchOfficeId = officeId;

    var halls = [];

    Object.keys(table.halls).forEach(hallId => {

      if (hallId === '0') return;

      var hall = table.halls[hallId];

      halls.push(
        {
          id : hall.id,
          seances : hall.seanceIds.map(seanceId => {
            var seanceInTable = table.seances[seanceId];
            var seance = {
              id : seanceInTable.id
            }

            if (seanceInTable.cost === undefined){
              seance.cost = -1;
            } else {
              seance.cost = seanceInTable.cost;
            }

            seance.film = {
              id : seanceInTable.film.id,
              duration : seanceInTable.film.duration + 20,
            }

            return seance;
          })
        }
      )
    })

    body.halls = halls;


    console.log(JSON.stringify(body))


    // API Task
  }

  return !loaded ? <h2>Загрузка</h2> : (
    <div>
      <center>sdffdgfd</center>
      <div>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            { days.map((day, index) =>
              <Tab
                key={index}
                className={({selected}) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                    selected
                      ? 'bg-white shadow'
                      : 'hover:text-blue-800'
                  )
                }
              >
                {day.date.getDate()}.{('0' + ( day.date.getMonth() + 1 )).slice(-2)}
              </Tab>
            )}
          </Tab.List>
          <Tab.Panels className="mt-2 focus:ring-0">
            {days.map((day, index) => {

              console.log(day)

                return (<Tab.Panel
                  key={index}
                  className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none'
                  )}
                >
                  <TimetableContext day={day} start={startTime} end={endTime} save={(table) => save(day.date, table)}/>
                </Tab.Panel>)
              }
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}