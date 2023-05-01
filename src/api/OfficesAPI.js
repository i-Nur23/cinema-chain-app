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

  static getAllOfficesLite = async (token) => {
    var url = `${this.baseURL}/BranchOffices/GetOfficesListLite`

    var response = await  axios.get(url, {headers : {
      "Authorization" : `Bearer ${token}`
    }});

    return response.data;
  }

  static getDeatilInfoAboutBranchOffice = async (id, token) => {
    var url = `${this.baseURL}/BranchOffices/GetDetailInfoAboutBranchForAdmin/${id}`

    var response = await  axios.get(url, {headers : {
      "Authorization" : `Bearer ${token}`
    }});

    return response.data;
  }

  static CreateOffice = async (
    name, 
    email, 
    mobilePhone, 
    description, 
    startWorkTime,
    endWorkTime,
    city,
    adress,
    longitude,
    latitude,
    cinemaHallsList,
    token,
  ) => {
    const url = `${this.baseURL}/BranchOffices/Create`

    let body = {
      "name": name,
      "email": email,
      "mobilePhone": mobilePhone,
      "description": description,
      "startWorkTime": startWorkTime,
      "endWorkTime": endWorkTime,
      "city": city,
      "adress": adress,
      "longitude": longitude,
      "latitude": latitude,
      "cinemaHallsList" : cinemaHallsList.map(hall => { return {
        type : hall.type,
        numOfRow : hall.rows,
        numOfPlacesInRow : hall.places,
      }})
    }

    var response = await axios.post(url, body, {headers : {
      "Authorization" : `Bearer ${token}`,
      "Content-Type" : "application/json"
    }})

    return response.data;

  }

  static DeleteOffice = async (id , token) => {
    var url = `${this.baseURL}/BranchOffices/UpdateBranchOffice/${id}`

    var response = await axios.delete(url, {headers : {
      "Authorization" : `Bearer ${token}`
    }})

    return response.data;
  }

  static UpdateOffcie = async (
    id,
    name, 
    email, 
    mobilePhone, 
    description, 
    startWorkTime,
    endWorkTime,
    city,
    adress,
    longitude,
    latitude,
    isChangedCinemaHalls,
    cinemaHallsList,
    token,
  ) => {
    const url = `${this.baseURL}/BranchOffices/UpdateBranchOffice`

    let body = {
      "id" : id,
      "name": name,
      "email": email,
      "mobilePhone": mobilePhone,
      "description": description,
      "startWorkTime": startWorkTime,
      "endWorkTime": endWorkTime,
      "city": city,
      "adress": adress,
      "longitude": longitude,
      "latitude": latitude,
      "isChangedCinemaHalls": isChangedCinemaHalls,
      "cinemaHallsList" : cinemaHallsList.map(hall => { return {
        id : hall.id,
        type : hall.type,
        numOfRow : hall.rows,
        numOfPlacesInRow : hall.places,
        isChanged : hall.isChanged,

      }})
    }

    var response = await axios.put(url, body, {headers : {
      "Authorization" : `Bearer ${token}`,
      "Content-Type" : "application/json"
    }})

    return response.data;
  }

  
}