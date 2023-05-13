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

  static getAllActors = async (token) => {
    var url = `${this.baseURL}/FilmsAdditionalInfo/GetAllActors`

    console.log(token);

    var response = await axios.get(url, {headers : {
        "Authorization" : `Bearer ${token}`
      }});

    return response.data;
  }

  static getAllDirectors = async (token) => {
    var url = `${this.baseURL}/FilmsAdditionalInfo/GetAllFilmDirectors`

    var response = await axios.get(url, {headers : {
      "Authorization" : `Bearer ${token}`
    }});

    return response.data;
  }

  static createNewActor = async (name, token) => {
    var url = `${this.baseURL}/FilmsAdditionalInfo/CreateNewActor/${name}`

    return await axios.post(url, {}, {headers : {
        "Authorization" : `Bearer ${token}`,
    }});
  }

  static createNewDirector = async (name, token) => {
    var url = `${this.baseURL}/FilmsAdditionalInfo/CreateNewFilmDirector/${name}`

    return await axios.post(url, {headers : {
        "Authorization" : `Bearer ${token}`
      }});
  }

  static editActor = async (id, name, token) => {
    var url = `${this.baseURL}/FilmsAdditionalInfo/UpdateActor`

    var body = {
      actorId : id,
      name : name
    }

    return await axios.put(url,body, {headers : {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }});
  }

  static editDirector = async (id, name, token) => {
    var url = `${this.baseURL}/FilmsAdditionalInfo/UpdateFilmDirector`

    var body = {
      filmDirectorId : id,
      name : name
    }

    return await axios.put(url,body, {headers : {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }});
  }

  static deleteActor = async (id, token) => {
    var url = `${this.baseURL}/FilmsAdditionalInfo/DeleteActor/${id}`

    return await axios.delete(url, {headers : {
        "Authorization" : `Bearer ${token}`
      }});
  }

  static deleteDirector = async (id, token) => {
    var url = `${this.baseURL}/FilmsAdditionalInfo/DeleteFilmDirector/${id}`

    return await axios.delete(url, {headers : {
        "Authorization" : `Bearer ${token}`
      }});
  }
}