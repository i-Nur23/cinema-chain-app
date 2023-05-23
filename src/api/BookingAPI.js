import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class BookingAPI extends MainAPIBase{
  static bookPlaces = async (seanceId, ticketsInfo, token) => {
    var body = new FormData();
    var obj = {};
    var url = `${this.baseURL}/Booking/BookingTickets`

    obj.seanceId = seanceId;
    body.append('seanceId', seanceId);

    obj.tickets = ticketsInfo.map(ticket => {
      return {"rowNumber" : ticket[0] + 1, "placeNumber" : ticket[1] + 1, "ticketCost" : ticket[2]}
    })

    var response = await axios.post(url, obj, {headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
    }})

    return response;

  }
}