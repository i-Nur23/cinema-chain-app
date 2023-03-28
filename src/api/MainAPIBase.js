export class MainAPIBase {
  static baseURL = 'https://localhost:7174/api'

  static config = {
    headers:{
      'Access-Control-Allow-Origin' : '*'
    }
  }
}