import {Link} from "react-router-dom";
import kp_logo from '../../assets/images/kinopoisk_logo.png'
import imdb_logo from '../../assets/images/imdb_logo.png'
import placeholder from "../../assets/images/placeholder.jpg"

export const TodayFilmsCard = ({film}) => {
  return(
    <Link to={`films/${film.id}`} className='rounded-lg bg-gray-100 hover:shadow hover:drop-shadow-2xl p-4 ease-in-out duration-300'>
      <div className='flex justify-start gap-4'>
        <img src={film.poster ?? placeholder} className='object-fill h-80 w-56 rounded-xl'/>
        <div>
          <p className='text-xl'><strong>{film.name}</strong></p>
          <div className='flex justify-start my-10 gap-5'>
            <img src={kp_logo} alt='ds' className='object-cover h-10 w-10 rounded-lg'/>
            <p className='my-auto text-lg text-gray-400'>{film.ratingOnKinopoisk}</p>
          </div>
          <div className='flex justify-start my-10 gap-5'>
            <img src={imdb_logo} className='object-cover h-10 w-10 rounded-lg'/>
            <p className='my-auto text-lg text-gray-400'>{film.ratingOnImdb}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}