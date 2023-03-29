import {DateHandler} from "../../utils/DateHandler";

export const AvailableDays = ({day, setDay}) => {


  const days = DateHandler.getListOfDays()


  return(
    <ul className="grid w-full gap-12 grid-cols-3 my-10 px-10">
      <li onClick={() =>setDay([0, DateHandler.getDateAfterDays(0)])}>
        <input type="radio" id="0" name="hosting" value="smal" className={`hidden peer/0`} checked={day[0] == 0 ? true : false}/>
        <label for="0"
               className="inline-flex items-center justify-center w-full p-2 text-gray-400 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 peer-checked/0:text-cyan-700 peer-checked/0:border-cyan-700">
          <div className="block justify-items-center">
            <div className="w-full text-lg font-semibold">{`сегодня, ${days[0][0]}, ${days[0][1]}`}</div>
          </div>
        </label>
      </li>
      <li onClick={() =>setDay([1,DateHandler.getDateAfterDays(1)])}>
        <input type="radio" id="1" name="hosting" value={1} className="hidden peer/1" checked={day[0] == 1 ? true : false}/>
        <label for="1"
               className="inline-flex items-center justify-center w-full p-2 text-gray-400 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 peer-checked/1:text-cyan-700 peer-checked/1:border-cyan-700">
          <div className="block">
            <div className="w-full text-lg font-semibold">{`завтра, ${days[1][0]}, ${days[1][1]}`}</div>
          </div>
        </label>
      </li>
      <li onClick={() => setDay([2,DateHandler.getDateAfterDays(2)])}>
        <input type="radio" id="2" name="hosting" value={2} className="hidden peer/2" checked={day[0] == 2 ? true : false}/>
        <label for="2"
               className="inline-flex items-center justify-center w-full p-2 text-gray-400 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 peer-checked/2:text-cyan-700 peer-checked/2:border-cyan-700">
          <div className="block">
            <div className="w-full text-lg font-semibold">{`послезавтра, ${days[2][0]}, ${days[2][1]}`}</div>
          </div>
        </label>
      </li>
    </ul>
  )
}
