export class MainAPIBase {
  //static baseURL = 'http://localhost:8081/KinoDriveWebApi'
  static baseURL = 'https://localhost:7174/KinoDriveWebApi'

  static config = {
    headers:{
      'Access-Control-Allow-Origin' : '*'
    }
  }
}