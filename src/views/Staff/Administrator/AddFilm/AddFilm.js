import placeholder from "../../../../assets/images/placeholder.jpg";
import {useState, Fragment, useEffect} from "react";
import './AddFilm.css'
import {TrashIcon, XMarkIcon, CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";
import {DefaultInput} from "../../../../components/Inputs";
import {SelectInput} from "../../../../components/MUIStyles";
import {Autocomplete, Checkbox, MenuItem, Select, TextField, styled} from "@mui/material";
import { Combobox, Transition } from "@headlessui/react";
import {ComboboxWithTags} from "../../../../components/Combobox";

export const AddFilm = () => {


  const ageRestrictions = [0, 6, 12, 16, 18];
  const genresList = ["комедия", "мультфильм", "хоррор", "фантастика", "триллер", "боевик", "мелодрама", "детектив",
    "приключения", "фэнтези", "военный", "семейный", "аниме", "исторический", "драма", "документальное",  "детское",
    "криминал", "биография", "вестерн", "спортивное", "мюзикл","короткометражка"
  ]

  const [poster, setPoster] = useState(null)
  const [photos, setPhotos] = useState([]);

  const [name, setName] = useState('');
  const [ageRestriction, setAgeResctriction] = useState(ageRestrictions[4]);
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [duration, setDuration] = useState(60);
  const [kpURL, setKpURL] = useState('');
  const [trailerURL, setTrailerURL] = useState('');
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('Добавление фильма');

  const [invalidArray, setInvalidArray] = useState([false, false, false, false, false]);
  const [invlaidComboboxes, setInvalidComboboxesArray] = useState([false, false, false]);

  const onPosterChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setPoster(URL.createObjectURL(img))
    } else {
      setPoster(null)
    }
  }

  /*useEffect(() => {
    var newComboboxesArray=[false, false, false];
    if (genres.length === 0){
      newComboboxesArray[0] = true;
    }

    if (selectedActors.length === 0){
      newComboboxesArray[1] = true;
    }

    if (selectedDirectors.length === 0){
      newComboboxesArray[2] = true;
    }

    setInvalidComboboxesArray(newComboboxesArray);
  },[genres, selectedActors, selectedDirectors])*/

  const addPhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setPhotos( [...photos , URL.createObjectURL(img)])
    }
  }

  const deletePhoto = (index) => {
    setPhotos(photos.filter((_, _index) => index !== _index ))
  }

  const moveGenre = (option) => {
    if (genres.indexOf(option) === -1) {
      setGenres([...genres, option])
    } else {
      setGenres(genres.filter(genre => genre != option))
    }
  }

  const handleSaving = async () => {
    var inputs = document.querySelectorAll('input[required]');
    console.log(inputs);
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

    if (!poster){
      setMessage('Вставьте постер фильма');
      ok = false;
    }

    if (ok){

    }
  }

  const valueChanged = (ind) => {
    setMessage('');
    setInvalidArray(invalidArray.map((isVal, innerIndex) => {
      if (innerIndex == ind) {
        return false;
      }
      return isVal;
    }))
  }

  const comboboxValueChanged = (ind) => {
    setMessage('');
    setInvalidComboboxesArray(invlaidComboboxes.map((isVal, innerIndex) => {
      if (innerIndex == ind) {
        return false;
      }
      return isVal;
    }))
  }

  return(
    <div>
      <center className='text-xl mb-10'>{title}</center>
      <div className='flex gap-10 divide-x'>
        <div className='h-fit w-1/4 flex flex-col gap-6 divide-y'>
          <div className='flex flex-col gap-3'>
            <center className='font-semibold'>Постер</center>
            <img src={poster ?? placeholder} className='rounded-lg h-96 object-fill'/>
            <div className='flex justify-between'>
              <label className="text-white bg-black rounded p-2 w-5/6 text-center">
                <input className='rounded' type='file' onChange={(e) => onPosterChange(e)}/>
                Загрузть
              </label>
              {
                poster ? <TrashIcon className='w-7 h-7 m-auto cursor-pointer hover:text-red-600' onClick={() => setPoster(null)}/> : null
              }
            </div>
          </div>
          <div className='flex flex-col gap-3 pt-4'>
            <center className='font-semibold'>Кадры из фильма</center>
            {
              photos.map( (photo, index) =>
                <div className='grid grid-cols-6'>
                  <img src={photo} className='rounded-l-lg w-full object-fill col-span-5 border'/>
                  <div className='cursor-pointer ease-in-out duration-100 hover:text-white flex flex-col justify-center border border-l-0 rounded-r-lg hover:bg-red-500'
                       onClick={() => deletePhoto(index)}>
                    <TrashIcon className='w-7 h-7 m-auto'/>
                  </div>
                </div>
              )
            }
            <div className='flex justify-between'>
              <label className="text-black bg-gray-100 rounded p-2 w-full text-center cursor-pointer">
                <input className='rounded' type='file' onChange={(e) => addPhoto(e)}/>
                Загрузть
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-6 px-3 w-3/4'>
          <center className='font-semibold mb-6'>Информация о фильме</center>
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
              <ComboboxWithTags values={genres} setValues={setGenres}
                                initList={genresList} placeholder={"введите жанр..."}
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
              <ComboboxWithTags values={selectedActors} initList={actors} setValues={setActors}
                                placeholder={'введите имя или фамилию актёра...'}
                                isInvalid={invlaidComboboxes[1]}
                                onChange={() => comboboxValueChanged(1)}
              />
            </div>
            <div>
              <p className='px-2'>Режиссер(-ы)</p>
              <ComboboxWithTags values={selectedDirectors} initList={directors} setValues={setDirectors}
                                placeholder={'введите имя или фамилию режиссёра...'}
                                isInvalid={invlaidComboboxes[2]}
                                onChange={() => comboboxValueChanged(2)}
              />
            </div>
          </div>
          <div>
            <p className='px-2'>URL страницы на Кинопоиске&trade;</p>
            <DefaultInput value={kpURL} setValue={(url) => setKpURL(url)} isInvalid={invalidArray[3]}
                            onChange={() => valueChanged(3)}/>
          </div>
          <div>
            <p className='px-2'>Ссылка на трейлер YouTube&trade;</p>
            <DefaultInput value={trailerURL} setValue={(url) => setTrailerURL(url)} isInvalid={invalidArray[4]}
                          onChange={() => valueChanged(4)}/>
          </div>
          <div className='flex justify-end w-full'>
            <div className='w-1/6'>
              <button className='w-full bg-cyan-700 text-white p-3 rounded-lg' onClick={handleSaving}>Сохранить</button>
              <p className='text-red-600'>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}