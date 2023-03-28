import {useParams} from "react-router-dom";
import drive from "../../assets/images/drive.jpg";
import revolver from "../../assets/images/revolver.jpg";
import dune from "../../assets/images/dune.jpg";
import cheburashka from "../../assets/images/cheburashka.jpg";
import inception from "../../assets/images/inception.jpg";
import oppenhaimer from "../../assets/images/oppenhaimer.jpg";
import {FilmSessions} from "../../components/Lists";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {FilmsAPI} from "../../api";

export  const FilmShedulue = (props) => {
  const {id} = useParams();
  const city = useSelector(state => state.city)

  const [film, setFilm] = useState();
  const [table, setTable] = useState();
  const [loaded, setLoaded] = useState(false)

  /*var films = [
    {
      id: 1,
      name: 'Драйв',
      description : 'Великолепный водитель – при свете дня он выполняет каскадерские трюки на съёмочных площадках Голливуда, ' +
        'а по ночам ведет рискованную игру. Но один опасный контракт – и за его жизнь назначена награда. Теперь, чтобы остаться ' +
        'в живых и спасти свою очаровательную соседку, он должен делать то, что умеет лучше всего – виртуозно уходить от погони.',
      director : 'Николас Виндинг Рефн',
      kp: 7.2,
      imdb : 7.7,
      poster : drive
    },
    {
      id: 2,
      name: 'Револьвер',
      description : 'Семь лет назад Джейк влип в неприятную историю. Город был помешан на нелегальных азартных играх, ' +
        'организованных преступным боссом Мака. Однажды накануне большой игры Мака потерял своего парня, и Джейку Грину ' +
        'предложили пойти на замену. Под давлением Грин согласился и выиграл за карточным столом. С этого всё и началось.',
      director : 'Гай Ричи',
      kp: 7.2,
      imdb : 7.7,
      poster : revolver
    },
    {
      id: 3,
      name: 'Дюна',
      description : 'Наследник знаменитого дома Атрейдесов Пол отправляется вместе с семьей на одну из самых опасных ' +
        'планет во Вселенной — Арракис. Здесь нет ничего, кроме песка, палящего солнца, гигантских чудовищ и основной ' +
        'причины межгалактических конфликтов — невероятно ценного ресурса, который называется меланж. В результате захвата ' +
        'власти Пол вынужден бежать и скрываться, и это становится началом его эпического путешествия. ' +
        'Враждебный мир Арракиса приготовил для него множество тяжелых испытаний, но только тот, кто готов взглянуть в ' +
        'глаза своему страху, достоин стать избранным.',
      director : 'Дени Вильнёв',
      kp: 8.7,
      imdb : 9.0,
      poster : dune
    },
    {
      id: 4,
      name: 'Чебурашка',
      description : 'Иногда, чтобы вернуть солнце и улыбки в мир взрослых, нужен один маленький ушастый герой. Мохнатого ' +
        'непоседливого зверька из далекой апельсиновой страны ждут удивительные приключения в тихом приморском городке, ' +
        'где ему предстоит найти себе имя, друзей и дом.\n' +
        '\n' +
        'Помогать — и мешать! — ему в этом будут нелюдимый старик-садовник, странная тетя-модница и ее капризная внучка, ' +
        'мальчик, который никак не начнет говорить, и его мама, которой приходится несладко, хотя она и варит самый ' +
        'вкусный на свете шоколад. И многие-многие другие, в чью жизнь вместе с ароматом апельсинов вот-вот ворвутся ' +
        'волшебство и приключения.',
      director : 'Дмитрий Дьяченко',
      kp: 7.2,
      imdb : 7.7,
      poster : cheburashka
    },
    {
      id: 5,
      name: 'Начало',
      description : 'Кобб – талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадет ценные секреты ' +
        'из глубин подсознания во время сна, когда человеческий разум наиболее уязвим. Редкие способности Кобба сделали ' +
        'его ценным игроком в привычном к предательству мире промышленного шпионажа, но они же превратили его в извечного ' +
        'беглеца и лишили всего, что он когда-либо любил.\n' +
        '\n' +
        'И вот у Кобба появляется шанс исправить ошибки. Его последнее дело может вернуть все назад, но для этого ему ' +
        'нужно совершить невозможное – инициацию. Вместо идеальной кражи Кобб и его команда спецов должны будут провернуть ' +
        'обратное. Теперь их задача – не украсть идею, а внедрить ее. Если у них получится, это и станет идеальным преступлением.\n' +
        '\n' +
        'Но никакое планирование или мастерство не могут подготовить команду к встрече с опасным противником, который, ' +
        'кажется, предугадывает каждый их ход. Врагом, увидеть которого мог бы лишь Кобб.',
      director : 'Кристофер Нолан',
      kp: 7.2,
      imdb : 7.7,
      poster : inception
    },{
      id: 6,
      name: 'Оппенгеймер',
      description : 'История жизни американского физика Роберта Оппенгеймера, который стоял во главе первых разработок ядерного оружия.',
      director : 'Кристофер Нолан',
      kp: 7.2,
      imdb : 7.7,
      poster : oppenhaimer
    }
  ]

  var film = films.find(x => x.id == id)*/

  useEffect(() => {
    (
      async () => {
        var data = await FilmsAPI.getFilmInfo(id,city);
        console.log(data)

        setFilm(data);
        setTable(data.sessionSchedule);
        setLoaded(true);
      }
    )()
  },[id, city])


  let content = loaded ?  <div className='container px-20 my-10'>
    <div className='flex justify-between gap-10'>
      <img src={inception} alt={film.name} className='object-cover h-96 rounded-lg'/>
      <div className='flex flex-col gap-5'>
        <p className='text-2xl'><strong>{film.name}</strong></p>
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
    <FilmSessions table={table}/>

  </div>: null


  return ( content
    /*<div className='container px-20 my-10'>
      <div className='flex justify-between gap-10'>
        <img src={inception} alt={film.name} className='object-cover h-96 rounded-lg'/>
        <div className='flex flex-col gap-5'>
          <p className='text-2xl'><strong>{film.name}</strong></p>
          <p className='text-xl'>{film.description}</p>
          <div className='inline-flex gap-2'>
            {
              film.genres.map(genre => (
                <p>{genre.description}</p>
              ))
            }
          </div>
          <div className='inline-flex gap-2'>
            <p className='text-gray-400'>Режиссёр: </p>
            {
              film.filmDirectors.map(dir => (
                <p>{dir.name}</p>
              ))
            }
          </div>
          <div className='inline-flex gap-2'>
            <p className='text-gray-400'>Актёры: </p>
            {
              film.actors.map(actor => (
                <p>{actor.name}</p>
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
      <FilmSessions table={table}/>

    </div>*/
  )
}