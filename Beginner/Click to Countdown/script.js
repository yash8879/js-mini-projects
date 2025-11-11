let count;
let timer;
function startCountdown() {
  clearInterval(timer);
  count = 5;
  const input = document.getElementById("timeInput").value;
  count = parseInt(input);
  if (isNaN(count) || count < 0) {
    document.getElementById("display").innerText =
      " Please enter a valid number";
    return;
  }

  document.getElementById("display").innerText = "Countdown: " + count;
  document.getElementById("restart").style.display = "none";

  timer = setInterval(() => {
    count--;

    if (count >= 0) {
      document.getElementById("display").innerText = "Countdown: " + count;
    } else {
      clearInterval(timer);
      document.getElementById("display").innerHTML = "⏰ Times up!";
      document.getElementById("restart").style.display = "inline";
    }
  }, 1000);
}

document.getElementById("startBtn").addEventListener("click", startCountdown);
document.getElementById("restart").addEventListener("click", startCountdown);
