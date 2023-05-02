import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class ManagerAPI extends MainAPIBase{
  static GetAllManagers = async (token) => {
    const url = `${this.baseURL}/Manager/GetManagerList`;

    const response = await axios.get(url, {headers : {
      "Authorization" : `Bearer ${token}`
    }})

    return response.data;
  }

  static GetManager = async (id, token) => {
    const url = `${this.baseURL}/Manager/GetManagerById/${id}`;

    const response = await axios.get(url, {headers : {
        "Authorization" : `Bearer ${token}`
    }});

    return response.data;
  }

  static AddManager = async (lastName, firstName, nickName, email, password, branchOfficeId, token) => {
    const url = `${this.baseURL}/Manager/Create`;

    let body = {
      lastName : lastName,
      firstName : firstName,
      nickName : nickName,
      email : email,
      password : password,
      branchOfficeId : branchOfficeId
    }

    const response = await axios.post(url, body, {headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }}
    )

    return response.data;
  }

  static UpdateManager = async (id, lastName, firstName, nickName, branchOfficeId, token) => {
    const url = `${this.baseURL}/Manager/Update`

    let body = {
      id : id,
      lastName : lastName,
      firstName : firstName,
      nickName : nickName,
      branchOfficeId : branchOfficeId
    }

    const response = await axios.put(url, body, {headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }}
    )

    return response.data;
  }

  static RemoveManager = async (id, token) => {
    const url = `${this.baseURL}/Manager/DeleteManagerById/managerId?managerId=${id}`;

    const response = await axios.delete(url, {headers : {
        "Authorization" : `Bearer ${token}`
      }})

    return response.data;
  }
}