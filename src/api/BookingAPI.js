import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";
import {useSelector} from "react-redux";

export class BookingAPI extends MainAPIBase{
  static bookPlaces = async (seanceId, ticketsInfo) => {
    var body = new FormData();
    var token = useSelector(state => state.auth.token);
    var url = `${this.baseURL}/Booking/BookingTickets`

    body.append('seanceId', seanceId);

    var tickets = ticketsInfo.map(ticket => {
      return{
        "rowNumber" : ticket[0],
        "placeNumber" : ticket[1],
        "ticketCost" : ticket[2]
      }
    })

    body.append('tickets', tickets)

    var response = await axios.post(url, body, {headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
    }})

    return response;

  }
}