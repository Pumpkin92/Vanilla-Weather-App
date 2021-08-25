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

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row weekly">`;
  let day = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];
  day.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
              <p>
                <span class="days">${day}</span><br /><span class="icon"
                  >🌧</span
                >
                <br /><span class="max-temp">21°</span>
                <span class="min-temp">10°</span>
              </p>
            </div>
            
`;
    console.log(day);
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//api integratoin

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
  let cityELement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  //let celsiusTemp = Math.round(response.data.main.temp);
  let windSpeed = document.querySelector("#wind-speed");
  let windRound = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let weatherIcon = document.querySelector("#weather-icon");

  celsiusTemp = response.data.main.temp;

  cityELement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(celsiusTemp);
  windSpeed.innerHTML = `${windRound}`;
  humidity.innerHTML = response.data.main.humidity;
  description.innerHTML = response.data.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  /*let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = formatDate(response.data.dt * 100);*/
}

function search(city) {
  let apiKey = "a2e69ade2d5f80fe8dd4f0ed09576a2a";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#type-here");
  search(cityInput.value);

  console.log(cityInput.value);
}

function showFarenheight(event) {
  event.preventDefault();
  let farenheightTemp = (celsiusTemp * 9) / 5 + 32;
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(farenheightTemp);
  celsiusLink.classList.remove("active");
  farenheightLink.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  farenheightLink.classList.remove("active");
}

let celsiusTemp = null;

let form = document.querySelector("#search-field");
form.addEventListener("submit", handleSubmit);

let farenheightLink = document.querySelector("#farenheight");
farenheightLink.addEventListener("click", showFarenheight);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

search("manchester");
displayForecast();
