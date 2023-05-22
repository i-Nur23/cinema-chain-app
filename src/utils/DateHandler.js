export class DateHandler{
  static getListOfDays = () => {

    const weekdays = ["вс","пн","вт","ср","чт","пт","сб"];

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

  static getDateAfterDays = (days) => {
    const now = new Date();
    let date = new Date();

    date.setDate(now.getDate() + days)

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    //let currentDate = `${('0' + month).slice(-2)}/${('0' + day).slice(-2)}/${year}`;
    let currentDate = `${('0' + day).slice(-2)}.${('0' + month).slice(-2)}.${year}`;
    return currentDate
  }
}