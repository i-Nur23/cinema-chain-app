import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class UserAPI extends MainAPIBase{
  static getAllBookings = async (token) => {
    var url = `${this.baseURL}/UserCabinet/GetBookingTickets`

    console.log(token);

    var response = await axios.get(url, {headers : {
        'Authorization' : `Bearer ${token}`
      }})

    return response;
  }
}