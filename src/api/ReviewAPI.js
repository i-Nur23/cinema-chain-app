import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class ReviewAPI extends MainAPIBase{

  static GetAllReviews = async (filmId, token) => {
    const url = `${this.baseURL}/Reviews/GetReviewsForFilmById?FilmId=${filmId}`

    const response = await axios.get(url, {headers : {
      "Authorization" : `Bearer ${token}`
      }});

    return response.data;
  }

  static PostUpdateReview = async (filmId, mark, description, token) => {
    const url = `${this.baseURL}/Reviews/CreateOrUpdateReview`

    let body = new FormData();
    body.append('filmId', filmId);
    body.append('value', mark);
    body.append('description', description);


    try {
      await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      return {ok : true};
    } catch (e) {
      return {ok : false, status : e.response.status};
    }
  }

}