//date and time
let currentDate = new Date();

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let amPm = document.querySelector("#am-pm");
let days = day[currentDate.getDay()];
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
if (hours > 12) {
  amPm.innerHTML = "PM";
}

let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let todayDate = document.querySelector("#date-time");
todayDate.innerHTML = `${days}, ${hours}:${minutes}`;

//api integratoin
let apiKey = "a2e69ade2d5f80fe8dd4f0ed09576a2a";
let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
