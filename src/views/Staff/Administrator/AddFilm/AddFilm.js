import placeholder from "../../../../assets/images/placeholder.jpg";
import {useState} from "react";
import './AddFilm.css'
import {TrashIcon, XMarkIcon} from "@heroicons/react/24/outline";

export const AddFilm = () => {

  const [poster, setPoster] = useState(null)
  const [photos, setPhotos] = useState([]);


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
        <div>

        </div>
      </div>
    </div>
  )
}