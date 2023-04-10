export class MainAPIBase {
  static baseURL = 'https://localhost:7174/KinoDriveWebApi'

  static config = {
    headers:{
      'Access-Control-Allow-Origin' : '*'
    }
  }
}