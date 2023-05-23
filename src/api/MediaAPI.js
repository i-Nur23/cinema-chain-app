import axios from "axios";

export class MediaAPI {
  static baseURL = "http://localhost:8082/api/MediaServer/filmImages"

  static AddFilmImages = async (id, images) => {
    var url = `${this.baseURL}/SaveMedia?filmId=${id}`;

    var body = new FormData()

    var len = images.length;

    for (let i = 0; i < len; i++){
      body.append('files', images[i])
    }

    return await axios.post(url, body, {headers :  {
      "Content-Type" : "multipart/form-data"
    }});
  }

  static AddFilmPoster = async (id, poster) => {
    var url = `${this.baseURL}/SavePoster?filmId=${id}`;

    var body = new FormData();
    body.append('file', poster)

    return await axios.post(url, body, {headers : {
      "Content-Type" : "multipart/form-data"
      }})
  }
}