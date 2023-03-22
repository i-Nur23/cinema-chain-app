export class DateHandler{
  static getListOfDays = () => {

    let options = { weekday: 'short'};

    const arr = [];

    const now = new Date(Date.now())

    for (let i = 0; i < 7; i++){
      const weekday = new Intl.DateTimeFormat('ru-RU', options).format(now.getDay())
      const day = now.getDate();
      arr.push([day, weekday])

      now.setDate(now.getDate() + 1)
    }

    return arr;
  }
}