import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class OfficesAPI extends MainAPIBase {
  static getCities = async () => {
    var url = `${this.baseURL}/OtherConroller/GetCities`

    var response = await  axios.get(url);

    return response.data;
  }

  static getOfficesByCity = async (city) => {
    var url = `${this.baseURL}/BranchOffices/GetOfficesListByCity/${city}`

    var response = await  axios.get(url);

    return response.data;
  }

  static getOfficeSeances = async (id) => {
    var url = `${this.baseURL}/BranchOffices/GetBranchOfficeShedule/${id}`

    var response = await  axios.get(url);

    return response.data;
  }

  static getAllOffices = async () => {
    var url = `${this.baseURL}/BranchOffices/GetOfficesList`

    var response = await  axios.get(url);

    return response.data;
  }
}