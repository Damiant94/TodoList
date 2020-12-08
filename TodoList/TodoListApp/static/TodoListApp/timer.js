
document.addEventListener("DOMContentLoaded", () => {
  timer();
})

function timer() {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth()+1;
  const year = now.getFullYear();

  let hours = now.getHours()
  if (hours < 10) hours = `0${hours}`
  let minutes = now.getMinutes()
  if (minutes < 10) minutes = `0${minutes}`
  let seconds = now.getSeconds()
  if (seconds < 10) seconds = `0${seconds}`
  const timer = document.querySelector(".timer")
  timer.innerText = `${day}/${month}/${year} | ${hours}:${minutes}:${seconds}`;
  setTimeout("timer()", 1000);
}
