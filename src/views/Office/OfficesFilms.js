import {useParams} from "react-router-dom";

export const OfficesFilms = () => {
  var {id} = useParams();
  let content =
    <div>
      <p>Пока ничего. Только id : {id}</p>
      <iframe
        className='w-3/5'
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A3f6f034b7734b5af4a8729cc454bef9c7e66a3bd8fde7e7b7abc667616f8ee31&amp;source=constructor"
        ></iframe>
    </div>
  return(content);
}