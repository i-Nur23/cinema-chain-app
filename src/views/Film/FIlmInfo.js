import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import placeholder from "../../assets/images/placeholder.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {ReviewAPI} from "../../api/ReviewAPI";
import {OtherUserReview, UserEmptyReview, UserReview} from "../../components/Review";
import {useSelector} from "react-redux";
import {FilmsAPI} from "../../api";

export const FIlmInfo = () => {

  const city = useSelector(state => state.city.name)
  const token = useSelector(state => state.auth.token)

  let content = null;

  const location = useLocation();
  const {id} = useParams();
  const [film, setFilm] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    (
      async () => {
        if (location.state){
          setFilm(location.state.film)
        } else {
          const film = await FilmsAPI.getFilmInfo(id, city);
          setFilm(film.info);
        }
        var resData = await ReviewAPI.GetAllReviews(id, token);
        setReviews(resData.reviewWRatingArray);
        setUserReview(resData.userReview);
        setLoaded(true);
      }
    )()
  },[])

  useEffect(() => {
    (
      async () => {
        if (token.length != 0) return;
        console.log('sdfs')
        var resData = await ReviewAPI.GetAllReviews(id, token);
        setReviews(resData.reviewWRatingArray);
        setUserReview(resData.userReview);
      }
    )()
  },[token])

  const refresh = async () => {
    var resData = await ReviewAPI.GetAllReviews(id, token);
    setReviews(resData.reviewWRatingArray);
    setUserReview(resData.userReview);
  }

  content = loaded &&
    <div className='container px-20 my-10'>
      <div className='flex justify-start gap-10'>
        <img src={film.poster ?? placeholder} alt={film.name} className='rounded-lg h-96 object-cover'/>
        <div className='flex flex-col gap-5'>
          <p className='text-2xl'><strong>{film.name}</strong>, {film.ageRestriction}+</p>
          <p className='text-xl'>{film.description}</p>
          <div className='flex flex-col gap-3'>
            <div className='inline-flex gap-2 text-gray-400'>
              {
                film.genres?.map((genre, index) => (
                  <p>{genre?.description + `${index == film.genres?.length - 1 ? '' : ','}`}</p>
                ))
              }
            </div>
            <div className='inline-flex gap-2'>
              <p className='text-gray-400'>Режиссёр: </p>
              {
                film.filmDirectors?.map((dir, index) => (
                  <p>{dir.name + `${index == film.filmDirectors.length - 1 ? '' : ','}`}</p>
                ))
              }
            </div>
            <div className='inline-flex gap-2'>
              <p className='text-gray-400'>Актёры: </p>
              {
                film.actors?.map( (actor, index) => (
                  <p>{actor.name + `${index == film.actors.length - 1 ? '' : ','}`}</p>
                ))
              }
            </div>
            <div className='inline-flex gap-2'>
              <p className='text-gray-400'>Год: </p>
              <p>{film.releaseYear}</p>
            </div>
            <div className='inline-flex gap-2'>
              <p className='text-gray-400'>Продолжительность: </p>
              <p>{`${Math.floor(film.length / 60)} ч ${film.length % 60 == 0 ? '' : `${film.length % 60} мин`}`}</p>
            </div>
            <div className='inline-flex gap-2'>
              <p className='text-gray-400'>Кинопоиск: </p>
              <p>{film.ratingOnKinopoisk}</p>
              <p className='text-gray-400'>IMDB: </p>
              <p>{film.ratingOnImdb}</p>
              <p className='text-gray-400'>Наш рейтинг: </p>
              <p>{film.rating}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className='my-5'/>
      <div className='grid grid-cols-2'>
        <div className='p-4 h-fit'>
          <center className='text-lg font-medium mb-3'>Трейлер</center>
          <iframe
            src={film.urlForTrailer}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            title="trailer"
            className='rounded mx-auto h-96 w-full'
          >
          </iframe>
        </div>
        <div className='p-4 h-fit'>
          <center className='text-lg font-medium mb-3'>Кадры из фильма</center>
          <div className='max-h-96'>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop = {true}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {
                film.imagesUrls?.map(imgSrc =>
                  <SwiperSlide>
                      <div className='object-cover h-96'>
                        <img src={imgSrc} alt='...' className='w-full h-full rounded'/>
                      </div>
                  </SwiperSlide>
                )
              }
            </Swiper>
          </div>
        </div>
      </div>
      <hr className='my-5'/>
      <div className='mx-auto w-2/5'>
        {
          userReview ?
            <UserReview filmId={id} token = {token} review={userReview} refresh={() => refresh()}/>
            :
            <UserEmptyReview filmId={id} token={token} refresh={() => refresh()}/>
        }
        {
          reviews.length !== 0 ?
            <div className='mt-3'>
              <center className='text-xl font-semibold mb-2'>Отзывы других зрителей</center>
              {
                reviews?.map(r => <OtherUserReview review={r}/>)
              }
            </div> :
            <div className='text-2xl text-gray-400 text-center'>
              Отзывов других зрителей пока нет :(
            </div>
        }
      </div>
    </div>

  return(content)
}