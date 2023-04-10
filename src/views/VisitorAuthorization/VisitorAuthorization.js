import {useEffect, useState} from "react";
import {LoginForm} from "../../components/Forms/LoginForm";
import {VisitorRegForm} from "../../components/Forms/VisitorRegForm";
import {useLocation} from "react-router-dom";
import {BookingAPI} from "../../api/BookingAPI";

export const VisitorAuthorization = () => {

  const [isLogin, setType] = useState(true)
  const [after, setAfter] = useState("/");
  const [seanceId, setSeanceId] = useState('');
  const [tickets, setTickets] = useState([]);
  const [bookAction, setBookAction] = useState(() => async (token) => {console.log('default action')})

  const location = useLocation();

  let BookPlaces = async (token) => {console.log('default action')};


  useEffect(() => {
    if (location.state){
      setAfter(location.state.after);
      setSeanceId(location.state.seanceId);
      setTickets(location.state.tickets);
      setBookAction(() => async (token) => {
        console.log(token);
        await BookingAPI.bookPlaces(location.state.seanceId, location.state.tickets, token);
      })
    }
  },[]);

  const changeType = () => {
    setType(!isLogin);
  }

  return(
    <div className='flex justify-center'>
      {isLogin ?
        <div className='m-auto w-4/12'>
          <LoginForm after={after} action={ async (token) => await bookAction(token)}/>
          <div className="flex justify-between">
            <p>
              Ещё нет учетной записи?
            </p>
            <button className="underline" onClick={changeType}>
              Зарегестрироваться
            </button>
          </div>
        </div>
        :
        <VisitorRegForm onTypeChange={changeType} after={after} action={bookAction}/>}
    </div>
  )
}