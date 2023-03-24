export class DateHandler{
  static getListOfDays = () => {

    const weekdays = ["вс","пн","вт","ср","чт","пт","сб"];

    let options = { weekday: 'short'};

    const arr = [];

    const now = new Date(Date.now())

    for (let i = 0; i < 7; i++){
      const weekday = weekdays[now.getDay()];
      const day = now.getDate();
      arr.push([day, weekday])

      now.setDate(now.getDate() + 1)
    }

    return arr;
  }
}