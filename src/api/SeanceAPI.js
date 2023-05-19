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
}