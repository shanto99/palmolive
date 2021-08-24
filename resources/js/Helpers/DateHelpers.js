const Helpers = {
  getBetweenMonths: function(d1, d2) {
    let betweenMonths = [];
    let monthCount = (d2.getFullYear() - d1.getFullYear()) * 12;
    monthCount -= d1.getMonth();
    monthCount += d2.getMonth();
    monthCount = monthCount <= 0 ? 0 : monthCount;


    for(let i=0; i<=monthCount; i++) {
      if(i === 0) {
        betweenMonths.push(d1);
      } else {
        d1 = new Date(d1.getFullYear(), d1.getMonth()+1, 1);
        betweenMonths.push(d1);
      }
    }

    return betweenMonths;

  },

  getBetweenYears(d1, d2)
  {
      let startingYear = Number(d1.getFullYear());
      let endingYear = d2.getFullYear();

      let yearDates = [];

      for(let i=startingYear; i <= endingYear; i++) {
          let yearDate = new Date(i, 1, 1);
          yearDates.push(yearDate);
      }

      return yearDates;
  },


  humanizedDateFormat: function(date) {
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    month = month.toString();
    let day = date.getDate();
    day = day.toString();


    if(month.length < 2) month = `0${month}`;
    if(day.length < 2) day = `0${day}`;

    return `${year}-${month}-${day}`;
  }

};

export default Helpers;
