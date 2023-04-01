import {useParams} from "react-router-dom";

export const OfficesFilms = () => {
  var {id} = useParams();
  let content = <div>Пока ничего. Только id : {id}</div>
  return(content);
}