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

  static getAllOperators = async (token) => {
    var url = `${this.baseURL}/Operator/GetOperatorsList`;

    var response = await axios.get(url, {
      headers : {
        "Authorization" : `Bearer ${token}`,
      }
    })

    return response.data;
  }

  static getOperatorById = async (id, token) => {
    var url = `${this.baseURL}/Operator/GetOperator/${id}`;

    var response = await axios.get(url, {
      headers : {
        "Authorization" : `Bearer ${token}`,
      }
    })

    return response.data
  }

  static updateOperator = async (id, lastName, firstName, nickName, token) => {
    var url = `${this.baseURL}/Operator/Update`;

    var body = {
      id : id,
      lastName : lastName,
      firstName : firstName,
      nickName : nickName
    }

    var response = await axios.put(url, body, {
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`,
      }
    })


    return response.data
  }

  static deleteOperator = async (id, token) => {
    var url = `${this.baseURL}/Operator/DeleteOperator/operatorId?operatorId=${id}`;

    var response = await axios.delete(url, {
      headers : {
        "Authorization" : `Bearer ${token}`,
      }
    })

    return response.data
  }

  static writeAnswer = async (complaintId, text, token) => {
    var url = `${this.baseURL}/Operator/CreateAnswer`;

    var body = {
      complaintId : complaintId,
      text : text
    }

    var response = await axios.patch(url, body, {
      headers : {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    })

    return response;
  }
}