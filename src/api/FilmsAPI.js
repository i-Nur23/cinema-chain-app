import axios from "axios";
import {MainAPIBase} from "./MainAPIBase";

export class FilmsAPI extends MainAPIBase{

  static getFilmsToStartPage = async () => {
    var url = `${this.baseURL}/Films/GetActiveFilms`

    var response = await axios.get(url);

    return response.data;
  }
}