import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class OperatorAPI extends MainAPIBase {
  static createOperator = async (firstName, lastName, nickName, email, password, token) => {
    var url = `${this.baseURL}/Operator/Create`;

    var body = {
      lastName: lastName,
      firstName: firstName,
      nickName: nickName,
      email: email,
      password : password
    }

    return await axios.post(url, body, {headers : {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    })

  }
}