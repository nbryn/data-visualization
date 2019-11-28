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

export const getMonth = (number) => {
  const months = ["Januar", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date();

  let month = date.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  if (number) {
    return month;
  } else {
    return months[month-1];
  }
};
