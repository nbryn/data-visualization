export const getCurrentTime = () => {
  let date = new Date();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDate();
  let month = getMonth(true);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  let currentTime = day + "/" + month + " at " + hours + ":" + minutes;

  return currentTime;
};

export const getMonth = number => {
  const months = [
    "Januar",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let date = new Date();

  let month = date.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  if (number) {
    return month;
  } else {
    return months[month - 1];
  }
};

export const convertNumberToMonth = monthNumber => {
  let result;

  const number = monthNumber.toString();

  const months = {
    "1": "jan",
    "2": "feb",
    "3": "mar",
    "4": "apr",
    "5": "may",
    "6": "jun",
    "7": "jul",
    "8": "aug",
    "9": "sep",
    "10": "oct",
    "11": "nov",
    "12": "dec"
  };

  for (let key in months) {
    if (number === key) {
      result = months[key];
    }
  }

  return result;
};
