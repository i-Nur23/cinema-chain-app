import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class AuthAPI{
  static LogIn = async (email, password) => {
    var body = new FormData()
    body.append("email", email);
    body.append("password", password);

    var url = `${MainAPIBase.baseURL}/Auth/Login`;

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

    var url = `${MainAPIBase.baseURL}/Auth/Registrate`;

    var response = await axios.post(url, body, {
      headers : {
        'Content-Type' : 'application/json'
      }
    })

    return response.data;
  }
}