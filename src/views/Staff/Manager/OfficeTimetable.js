import {useEffect, useState} from "react";
import {FilmsAPI} from "../../../api";
import {Tab} from "@headlessui/react";
import {ActorsPanel, DirectorsPanel} from "../../../components/TabPanels";
import {TimetableContext} from "./TimetableContext";

export const OfficeTimetable = () => {

  const [days, setDays] = useState([]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  useEffect(() => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    let datesArray = []
    Array.from({length : 7}, (_, index) => {
      datesArray.push({date : new Date(date)});
      date.setDate(date.getDate() + 1)
    })
    console.log(datesArray);
    setDays(datesArray);
  },[])


  return(
    <div>
      <div>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            { days.map((day, index)  =>
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
            {days.map((day, index) =>
              <Tab.Panel
                key={index}
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none'
                )}
              >
                <TimetableContext day={day}/>
              </Tab.Panel>
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}