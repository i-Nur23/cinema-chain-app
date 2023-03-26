import {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {HallPlace} from "../Checkboxes";

export const TicketChoiceDialog = ({isOpen, close}) => {


  const [rows, setRows] = useState(12);
  const [placesInRow, setPlacesInRow] = useState(20);

  const [chosenTickets, setChosenTickets] = useState([])

  const [places, setPlaces] = useState()

  useEffect(() => {
    console.log('rendering')

    var hall = [];

    for (let i = 0; i < rows; i++){
      var row = [];

      for (let j = 0; j < placesInRow; j++){
        row.push(false)
      }

      hall.push(row);
    }

    setPlaces(hall);

  }, [])

  const placeChoice = (row, place) => {

    const newArr = places.map((row_array, index) => {
      if (index == row){
        const newRow  = row_array.map((isChecked, index) => {
          if (index == place){
            return !isChecked;
          }

          return isChecked;
        })

        return newRow;
      }

      return row_array;
    })

    setPlaces(newArr);
  }


  const PlacesRow = ({row}) => {

    console.log('places ' + places);

    return (
    <div className='flex justify-between gap-4'>
      {
        Array.from(Array(placesInRow).keys()).map(place => {

          return (
          <HallPlace
            row={row}
            place={place}
            checked={ places == undefined ? false : places[row][place]}
            setChoice={(x,y) => placeChoice(x,y)}
            color={ row > 1 && row < rows - 2 && place > 2 && place < placesInRow - 3 ? 'cyan' : 'red'}
          />
          )
        }
        )
      }
    </div>
  )}


  return(
    <Dialog as="div" className="relative z-50 w-full" onClose={close}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          ><div>
            <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 text-center"
              >
              </Dialog.Title>
              <div className="grid grid-cols-4 gap-2">
                <div className='col-span-3 flex flex-col gap-4'>
                  {
                    Array.from(Array(rows).keys()).map(row => { return <PlacesRow row={row}/>})
                  }
                </div>
                <div className='flex justify-between'>
                  <ul className='overflow-auto'>{
                    chosenTickets.map(place => (
                      <li>Ряд {place[0] + 1}, Место {place[1] + 1}</li>
                    ))
                  }
                  </ul>
                  <button>
                    Далее
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  )
}