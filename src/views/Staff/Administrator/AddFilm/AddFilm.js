import placeholder from "../../../../assets/images/placeholder.jpg";
import {useState, Fragment} from "react";
import './AddFilm.css'
import {TrashIcon, XMarkIcon, CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";
import {DefaultInput} from "../../../../components/Inputs";
import {SelectInput} from "../../../../components/MUIStyles";
import {Autocomplete, Checkbox, MenuItem, Select, TextField, styled} from "@mui/material";
import { Combobox, Transition } from "@headlessui/react";

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
  const [directors, setDirectors] = useState([]);
  const [duration, setDuration] = useState(60);
  const [kpURL, setKpURL] = useState('');
  const [trailerURL, setTrailerURL] = useState('');
  const [message, setMessage] = useState('');

  const [invalidArray, setInvalidArray] = useState([false, false, false, false, false, false, false, false, false,]);
  const [query, setQuery] = useState('');

  const onPosterChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setPoster(URL.createObjectURL(img))
    } else {
      setPoster(null)
    }
  }

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

  const filteredGenres =
    query === ''
      ? genresList
      : genresList.filter((g) =>
          g
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return(
    <div>
      <center className='text-xl mb-10'>Добавление фильма</center>
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
        <div className='flex flex-col gap-3 px-3 w-3/4'>
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
              <Combobox value={genres} onChange={setGenres} multiple>
                <div className="relative">
                  <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus:outline-none">
                    <div className={`flex px-2 min-h-[40px] flex-wrap ${genres.length !== 0 ? 'pt-2' : ''}`}>
                      {
                        genres.map(genre => 
                        <div className="flex gap-2 m-1 text-sm h-4/5 p-1 rounded bg-gray-200">
                          {genre}
                          <XMarkIcon className="w-4 h-4 m-auto cursor-pointer" onClick={() => setGenres(genres.filter(_genre => _genre !== genre ))}/>
                        </div>
                        )
                      }
                      <Combobox.Input
                        className="w-full border-none py-2 px-2 text-sm leading-5 text-gray-900 focus:ring-0"
                        placeholder="введите жанр..."
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredGenres.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredGenres.map((genre, index) => (
                          <Combobox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-gray-200' : ''
                              }`
                            }
                            value={genre}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {genre}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? '' : 'text-gray-700'
                                    }`}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>
            <div>
              <p>Год</p>
              <DefaultInput value={year} setValue={(y) => setYear(y)} isInvalid={invalidArray[2]}
                            onChange={() => valueChanged(2)}/>
            </div>
            <div>
              <p>Продолжительность (мин.)</p>
              <DefaultInput value={duration} setValue={(d) => setDuration(d)} isInvalid={invalidArray[3]}
                            onChange={() => valueChanged(3)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}