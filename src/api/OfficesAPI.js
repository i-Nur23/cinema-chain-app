import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class OfficesAPI extends MainAPIBase {
  static getCities = async () => {
    var url = `${this.baseURL}/OtherConroller/GetCities`

    var response = await  axios.get(url);

    return response.data;
  }
}