import {DateHandler} from "../../utils/DateHandler";

export const AvailableDays = ({day, setDay}) => {


  const days = DateHandler.getListOfDays()


  return(
    <ul className="grid w-full gap-6 grid-cols-9 my-10">
      <li className="col-span-2" onClick={() =>setDay(0)}>
        <input type="radio" id="0" name="hosting" value="smal" className={`hidden peer/0`} checked={day == 0 ? true : false}/>
        <label for="0"
               className="inline-flex items-center justify-center w-full p-2 text-gray-400 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 peer-checked/0:text-cyan-700 peer-checked/0:border-cyan-700">
          <div className="block justify-items-center">
            <div className="w-full text-lg font-semibold">{`сегодня, ${days[0][0]}, ${days[0][1]}`}</div>
          </div>
        </label>
      </li>
      <li className="col-span-2" onClick={() =>setDay(1)}>
        <input type="radio" id="1" name="hosting" value={1} className="hidden peer/1" checked={day == 1 ? true : false}/>
        <label for="1"
               className="inline-flex items-center justify-center w-full p-2 text-gray-400 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 peer-checked/1:text-cyan-700 peer-checked/1:border-cyan-700">
          <div className="block">
            <div className="w-full text-lg font-semibold">{`завтра, ${days[1][0]}, ${days[1][1]}`}</div>
          </div>
        </label>
      </li>
      <li onClick={() => setDay(2)}>
        <input type="radio" id="2" name="hosting" value={2} className="hidden peer/2" checked={day == 2 ? true : false}/>
        <label for="2"
               className="inline-flex items-center justify-center w-full p-2 text-gray-400 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 peer-checked/2:text-cyan-700 peer-checked/2:border-cyan-700">
          <div className="block">
            <div className="w-full text-lg font-semibold">{`${days[2][0]}, ${days[2][1]}`}</div>
          </div>
        </label>
      </li>
      <li onClick={() => setDay(3)}>
        <input type="radio" id="3" name="hosting" value={3} className="hidden peer/3" checked={day == 3 ? true : false}/>
        <label for="3"
               className="inline-flex items-center justify-center w-full p-2 text-gray-400 bg-white border border-gray-200
               rounded-lg cursor-pointer hover:bg-gray-100 peer-checked/3:text-cyan-700 peer-checked/3:border-cyan-700">
          <div className="block">
            <div className="w-full text-lg font-semibold">{`${days[3][0]}, ${days[3][1]}`}</div>
          </div>
        </label>
      </li>
      <li onClick={() => setDay(4)}>
        <input type="radio" id="4" name="hosting" value={4} className="hidden peer/4" checked={day == 4 ? true : false}/>
        <label for="4"
               className="inline-flex items-center justify-center w-full p-2 text-gray-400 bg-white border border-gray-200
               rounded-lg cursor-pointer hover:bg-gray-100 peer-checked/4:text-cyan-700 peer-checked/4:border-cyan-700">
          <div className="block">
            <div className="w-full text-lg font-semibold">{`${days[4][0]}, ${days[4][1]}`}</div>
          </div>
        </label>
      </li>
      <li onClick={() => setDay(5)}>
        <input type="radio" id="5" name="hosting" value={5} className="hidden peer/5" checked={day == 5 ? true : false}/>
        <label for="5"
               className="inline-flex items-center justify-center w-full p-2 text-gray-400 bg-white border border-gray-200
               rounded-lg cursor-pointer hover:bg-gray-100 peer-checked/5:text-cyan-700 peer-checked/5:border-cyan-700">
          <div className="block">
            <div className="w-full text-lg font-semibold">{`${days[5][0]}, ${days[5][1]}`}</div>
          </div>
        </label>
      </li>
      <li onClick={() => setDay(6)}>
        <input type="radio" id="6" name="hosting" value={6} className="hidden peer/6" checked={day == 6 ? true : false}/>
        <label for="6"
               className="inline-flex items-center justify-center w-full p-2 text-gray-400 bg-white border border-gray-200
               rounded-lg cursor-pointer hover:bg-gray-100 peer-checked/6:text-cyan-700 peer-checked/6:border-cyan-700">
          <div className="block">
            <div className="w-full text-lg font-semibold">{`${days[6][0]}, ${days[6][1]}`}</div>
          </div>
        </label>
      </li>
    </ul>
  )
}
