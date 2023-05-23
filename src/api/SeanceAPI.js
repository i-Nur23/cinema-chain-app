import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class SeanceAPI extends MainAPIBase{
  static getSeanceInfo = async (id) => {
    var url = `${this.baseURL}/Seans/GetSeanceDetailInfo?seanceId=${id}`;

    var response = await axios.get(url);

    return response.data;
  }

  static getTimetableForWeek = async (branchOffcieId) => {
    var url = `${this.baseURL}/Seans/GetTimeTableForWeek?branchOffcieId=${branchOffcieId}`;

    var response = await axios.get(url);

    return response.data;
  }

  static saveTimeTable = async (body, basket, token) => {
    var url = `${this.baseURL}/Seans/MakeShedule`;
    const data = {shedule : body, basket : basket}
    console.log(data);

    var response = await axios.post(url, data, {
      headers : {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    });

    return response.data;
  }
}