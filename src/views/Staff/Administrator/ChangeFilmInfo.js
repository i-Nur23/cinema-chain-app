import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FilmsAPI} from "../../../api";
import {DefaultInput} from "../../../components/Inputs";
import {MenuItem, Select} from "@mui/material";
import {SelectInput} from "../../../components/MUIStyles";
import {ComboboxWithTagsGenres, ComboboxWithTagsPersons} from "../../../components/Combobox";
import {Switch} from "@headlessui/react";

export const ChangeFilmInfo = () => {
  const ageRestrictions = [0, 6, 12, 16, 18];

  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const {id} = useParams();

  const [name, setName] = useState('');
  const [active, setActive] = useState(true);
  const [ageRestriction, setAgeResctriction] = useState(ageRestrictions[4]);
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [duration, setDuration] = useState(60);
  const [kpURL, setKpURL] = useState('');
  const [trailerURL, setTrailerURL] = useState('');
  const [message, setMessage] = useState('');

  const [invalidArray, setInvalidArray] = useState([false, false, false]);
  const [invlaidComboboxes, setInvalidComboboxesArray] = useState([false, false, false]);

  useEffect(() => {
    FilmsAPI.getAllActors(token)
      .then(resData => setActors(resData.actorsList));

    FilmsAPI.getAllDirectors(token)
      .then(resData => setDirectors(resData.filmDirectorList));

    FilmsAPI.getAllGenres(token)
      .then(resData => setGenres(resData.genres))

    FilmsAPI.getFilmInfoWithoutTable(id)
      .then(film => {
        setName(film.name);
        setDescription(film.description);
        setAgeResctriction(film.ageRestriction);
        setYear(film.releaseYear);
        setDuration(film.length);
        setKpURL(film.urlForKinopoisk);
        setTrailerURL(film.urlForTrailer);
        setSelectedActors(film.actors);
        setSelectedDirectors(film.filmDirectors);
        setSelectedGenres(film.genres);
        setActive(film.isActive);
      })

  },[])

  const handleSaving = async () => {
    var inputs = document.querySelectorAll('input[required]');
    var newArray = invalidArray.map(x => x);
    var ok = true;
    inputs.forEach((input, index) => {
      if (input.value.length == 0 ) {
        ok = false;
        input.setCustomValidity("Это обязательное поле")
        newArray[index] = true;
      }
    })
    setInvalidArray(newArray);

    var newComboboxesArray=[false, false, false];
    if (genres.length === 0){
      ok = false;
      newComboboxesArray[0] = true;
    }

    if (selectedActors.length === 0){
      ok = false;
      newComboboxesArray[1] = true;
    }

    if (selectedDirectors.length === 0){
      ok = false;
      newComboboxesArray[2] = true;
    }

    setInvalidComboboxesArray(newComboboxesArray);

    if (ok){
      try{
        await FilmsAPI.changeFilmInfo(id, name, description, year, duration, ageRestriction, active, trailerURL, kpURL,
          selectedGenres.map(g => g.id),
          selectedActors.map(a => a.id),
          selectedDirectors.map(d => d.id), token);

        navigate('/staff/main/films');

      } catch (e) {
        if (e.response.status === 401){
          navigate('/staff')
        }
      }
    }
  }

  const valueChanged = (ind) => {
    setMessage('');
    setInvalidArray(invalidArray.map((isVal, innerIndex) => {
      if (innerIndex === ind) {
        return false;
      }
      return isVal;
    }))
  }

  const comboboxValueChanged = (ind) => {
    setMessage('');
    setInvalidComboboxesArray(invlaidComboboxes.map((isVal, innerIndex) => {
      if (innerIndex === ind) {
        return false;
      }
      return isVal;
    }))
  }

  return(
    <div>
      <center className='text-xl mb-10'>Данные о фильме</center>
        <div className='flex flex-col gap-6 px-3'>
          <div className='flex gap-3'>
            <div className='w-3/4'>
              <p>Название фильма</p>
              <DefaultInput value={name} setValue={(n) => setName(n)} isInvalid={invalidArray[0]}
                            onChange={() => valueChanged(0)}/>
            </div>
            <div className='w-1/4'>
              <p>Возрастной рейтинг</p>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                input={<SelectInput/>}
                value={ageRestriction}
                onChange={(e) => setAgeResctriction(e.target.value)}
              >
                {
                  ageRestrictions.map(ar =>
                    <MenuItem value={ar}>{ar}+</MenuItem>
                  )
                }
              </Select>
            </div>
          </div>
          <div>
            <p className='px-2'>Описание</p>
            <textarea
              className='resize-none rounded-xl w-4/5 border-gray-300 h-24 focus:border-gray-400 focus:ring focus:ring-gray-100 focus:outline-none'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 gap-6'>
            <div className='col-span-2'>
              <p>Жанры</p>
              <ComboboxWithTagsGenres values={selectedGenres} setValues={setSelectedGenres}
                                      initList={genres} placeholder={"введите жанр..."}
                                      isInvalid={invlaidComboboxes[0]}
                                      onChange={() => comboboxValueChanged(0)}
              />
            </div>
            <div>
              <p>Год</p>
              <DefaultInput value={year} setValue={(y) => setYear(y)} isInvalid={invalidArray[1]}
                            onChange={() => valueChanged(1)}/>
            </div>
            <div>
              <p>Продолжительность (мин.)</p>
              <DefaultInput value={duration} setValue={(d) => setDuration(d)} isInvalid={invalidArray[2]}
                            onChange={() => valueChanged(2)}/>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <p className='px-2'>Актеры</p>
              <ComboboxWithTagsPersons values={selectedActors} initList={actors} setValues={setSelectedActors}
                                       placeholder={'введите имя или фамилию актёра...'}
                                       isInvalid={invlaidComboboxes[1]}
                                       onChange={() => comboboxValueChanged(1)}
              />
            </div>
            <div>
              <p className='px-2'>Режиссер(-ы)</p>
              <ComboboxWithTagsPersons values={selectedDirectors} initList={directors} setValues={setSelectedDirectors}
                                       placeholder={'введите имя или фамилию режиссёра...'}
                                       isInvalid={invlaidComboboxes[2]}
                                       onChange={() => comboboxValueChanged(2)}
              />
            </div>
          </div>
          <div>
            <p className='px-2'>URL страницы на Кинопоиске&trade;</p>
            <DefaultInput value={kpURL} setValue={(url) => setKpURL(url)} required={false} onChange={() => {}}/>
          </div>
          <div>
            <p className='px-2'>Ссылка на трейлер YouTube&trade;</p>
            <DefaultInput value={trailerURL} setValue={(url) => setTrailerURL(url)} required={false} onChange={() => {}}/>
          </div>
          <div className="flex gap-3">
            <p className='my-auto'>В прокате</p>
            <Switch
              checked={active}
              onChange={setActive}
              className={`${active ? 'opacity-100' : 'opacity-50'}
          relative inline-flex h-[30px] w-[66px] bg-cyan-900 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${active ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[27px] w-[27px] transform bg-white rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
          <div className='flex justify-end w-full'>
            <div className='w-1/6'>
              <button className='w-full bg-cyan-700 text-white p-3 rounded-lg' onClick={handleSaving}>Сохранить</button>
              <p className='text-red-600'>{message}</p>
            </div>
          </div>
        </div>
    </div>
  )
}