import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
/*import "react-responsive-carousel/lib/styles/carousel.min.css";*/
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import placeholder from "../../assets/images/placeholder.jpg";
import {Carousel} from "react-responsive-carousel";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const FIlmInfo = () => {

  const location = useLocation();
  const {id} = useParams();
  const [film, setFilm] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [reviews, setReviews] = useState();

  useEffect(() => {
    console.log(location.state.film)
    setFilm(location.state.film)
    setLoaded(true);
  },[])

  let content = !loaded ? null :
    <div className='container px-20 my-10'>
      <div className='flex justify-start gap-10'>
        <img src={film.poster ?? placeholder} alt={film.name} className='rounded-lg h-96 object-cover'/>
        <div className='flex flex-col gap-5'>
          <p className='text-2xl'><strong>{film.name}</strong>, {film.ageRestriction}+</p>
          <p className='text-xl'>{film.description}</p>
          <div className='flex flex-col gap-3'>
            <div className='inline-flex gap-2 text-gray-400'>
              {
                film.genres.map((genre, index) => (
                  <p>{genre.description + `${index == film.genres.length - 1 ? '' : ','}`}</p>
                ))
              }
            </div>
            <div className='inline-flex gap-2'>
              <p className='text-gray-400'>Режиссёр: </p>
              {
                film.filmDirectors.map((dir, index) => (
                  <p>{dir.name + `${index == film.filmDirectors.length - 1 ? '' : ','}`}</p>
                ))
              }
            </div>
            <div className='inline-flex gap-2'>
              <p className='text-gray-400'>Актёры: </p>
              {
                film.actors.map( (actor, index) => (
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
                film.imagesUrls.map(imgSrc =>
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
      <center className='text-xl font-semibold'>Отзывы</center>
    </div>

  return(content)
}