import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class UserAPI extends MainAPIBase{
  static getAllBookings = async (token) => {
    var url = `${this.baseURL}/UserCabinet/GetBookingTickets`

    var response = await axios.get(url, {header : {
        'Authorization' : `Bearer ${token}`
      }})

    return response;
  }
}