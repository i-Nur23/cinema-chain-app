import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class SeanceAPI extends MainAPIBase{
  static getBookedPlacesForSeance = async (id) => {
    var url = `${this.baseURL}/Booking/GetBookingPlaces?seanceId=${id}`;

    var response = await axios.get(url);

    return response.data;
  }
}