import axios from "axios";
import {MainAPIBase} from "./MainAPIBase";

export class FilmsAPI extends MainAPIBase{

  static getFilmsToStartPage = async () => {
    var url = `${this.baseURL}/Films/GetActiveFilms`

    var response = await axios.get(url);

    return response.data;
  }

  static getFilmInfo = async (id, city) => {
    var url = `${this.baseURL}/Films/GetFilmByIdAndCity?id=${id}&city=${city}`

    var response = await axios.get(url);

    return response.data;
  }
}