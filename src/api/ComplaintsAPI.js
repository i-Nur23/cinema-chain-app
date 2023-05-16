import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class ComplaintsAPI extends MainAPIBase {
  static createComplaint = async (text, branchOfficeId, token) => {

    var brId;

    if (branchOfficeId === 0){
      brId = '';
    } else {
      brId = branchOfficeId;
    }

    var url = `${this.baseURL}/Complaint/CreateComplaint?brId=${brId}&text=${text}`

    return await axios.post(url, {}, {headers : {
      "Authorization" : `Bearer ${token}`
    }
    })
  }

  static getAllComplaints = async (token) => {
    var url = `${this.baseURL}/Complaint/GetAllComplaints`

    var response = await axios.get(url, {
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    });

    return response.data
  }

  static getAllComplaints = async (token) => {
    var url = `${this.baseURL}/Complaint/GetAllComplaints`

    var response = await axios.get(url, {
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    });

    return response.data
  }

  static getBranchOfficeComplaints = async (token) => {
    var url = `${this.baseURL}/Complaint/GetAllComplaintsByBranchOffice`

    var response = await axios.get(url, {
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    });

    return response.data
  }

  static getUserComplaints = async (token) => {
    var url = `${this.baseURL}/Complaint/GetAllComplaintsByUser`

    var response = await axios.get(url, {
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    });

    return response.data
  }

  static getActiveComplaints = async (token) => {
    var url = `${this.baseURL}/Complaint/GetComplaintsListWithoutAnswer`

    var response = await axios.get(url, {
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    });

    return response.data
  }

  static getArchiveComplaints = async (token) => {
    var url = `${this.baseURL}/Complaint/GetComplaintsListWithAnswer`

    var response = await axios.get(url, {
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    });

    return response.data
  }
}