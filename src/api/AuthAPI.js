import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";
import {Form} from "react-router-dom";

export class AuthAPI extends MainAPIBase{
  static LogIn = async (email, password) => {
    var body = new FormData()
    body.append("email", email);
    body.append("password", password);

    var url = `${this.baseURL}/Auth/Login`;

    var response = await axios.post(url, body, {
      headers : {
        'Content-Type' : 'application/json'
      }
    })

    return response.data;
  }

  static Register = async (name, surname, email, login, password) => {
    var body = new FormData()
    body.append("email", email);
    body.append("password", password);
    body.append("firstName", name);
    body.append("lastName", surname);
    body.append("nickName", login);

    var url = `${this.baseURL}/Auth/Registrate`;

    var response = await axios.post(url, body, {
      headers : {
        'Content-Type' : 'application/json'
      }
    })

    return response.data;
  }

  static ChangeInfo = async (token, name, surname, email, nick) => {
    const url = `${this.baseURL}/UserCabinet/ChangeUserData`

    const body = new FormData();
    body.append('firstName', name);
    body.append('lastName', surname);
    body.append('nickName', nick);
    body.append('email', email);

    try {
      const response = await axios.put(url, body, {headers : {
          'Authorization' : `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }})

      return {ok : true, data : response.data};
    } catch (e) {
      return {ok : false, status : e.response.status}
    }


  }

  static async GetInfo(token) {
    const url = `${this.baseURL}/UserCabinet/GetUserInfo`

    try {
      const response = await axios.get(url, {headers : {
          'Authorization' : `Bearer ${token}`
        }})

      return {ok : true, data : response.data};
    } catch (e) {
      return {ok : false, status : e.response.status}
    }



  }
}