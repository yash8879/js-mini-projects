let clockDiv = document.getElementById("clock");
function updateTime() {
  let now = new Date();

  let hour = now.getHours();
  let minute = now.getMinutes();
  let seconds = now.getSeconds();

  let period;
  if (hour == 0) {
    hour = 12;
    period = "Am";
  } else if (hour == 12) {
    period = "PM";
  } else if (hour > 12) {
    hour = hour - 12;
    period = "PM";
  } else {
    period = "AM";
  }

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  clockDiv.innerText = `${hour}:${minute}:${seconds} ${period}`;
}
setInterval(updateTime, 1000);
