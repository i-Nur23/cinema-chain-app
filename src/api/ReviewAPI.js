import {MainAPIBase} from "./MainAPIBase";
import axios from "axios";

export class ReviewAPI extends MainAPIBase{

  static GetAllReviews = async (filmId) => {
    const url = `${this.baseURL}/Reviews/GetReviewsForFilmById?FilmId=${filmId}`

    const response = await axios.get(url);

    return response.data;
  }

}