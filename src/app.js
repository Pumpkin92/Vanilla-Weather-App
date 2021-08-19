//date and time
function formatDate(timestamp) {
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
}
formatDate();

//api integratoin
let apiKey = "a2e69ade2d5f80fe8dd4f0ed09576a2a";
let city = "london";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

/*function formatDate(timestamp) {
  let date = new date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  return `${day}, ${hours}:${minutes}`;
}
*/
function showTemp(response) {
  console.log(response.data);
  let temp = document.querySelector("#temp");
  let tempRounded = Math.round(response.data.main.temp);
  temp.innerHTML = `${tempRounded}`;
  console.log(response.data.main.temp);
  let windSpeed = document.querySelector("#wind-speed");
  let windRound = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${windRound}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let weatherIcon = document.querySelector("#weather-icon");
  let icon = response.data.weather[0].icon;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  /*let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = formatDate(response.data.dt * 100);*/
}

axios.get(`${apiUrl}`).then(showTemp);
