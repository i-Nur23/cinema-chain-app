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
}