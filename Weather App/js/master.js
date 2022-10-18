let locationValue = document.getElementById("My-location");
let temperatureIcon = document.getElementById("temperature-icon");
let temperatureValue = document.getElementById("temperature-value");
let climate = document.getElementById("climate-value");
let iconfile;
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("button-addon2");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
});

let getWeather = async (city) => {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=07b2c2a27f1b25e4dc3e8cba161476af`
    );
    let weatherData = await response.json();
    let { name } = weatherData;
    let { feels_like } = weatherData.main;
    let { id, main } = weatherData.weather[0];

    locationValue.textContent = name;
    climate.textContent = main;
    temperatureValue.textContent = Math.round(feels_like - 273);
    if (id < 300 && id > 200) {
      temperatureIcon.src = "icons/thunderstorm.svg";
    } else if (id < 400 && id > 300) {
      temperatureIcon.src = "icons/cloud.svg";
    } else if (id < 600 && id > 500) {
      temperatureIcon.src = "icons/rain.svg";
    } else if (id < 700 && id > 600) {
      temperatureIcon.src = "icons/snow.svg";
    } else if (id < 800 && id > 700) {
      temperatureIcon.src = "icons/cloud.svg";
    } else if (id == 800) {
      temperatureIcon.src = "icons/cloudy-and-sun.svg";
    }
    // el svg mabyt8ayrsh 3ashan el id elly rag3 fe el object dayman 803
  } catch (error) {
    alert(`City Not Found`);
  }
};

window.addEventListener("load", () => {
  let longitude;
  let latitude;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=07b2c2a27f1b25e4dc3e8cba161476af`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let { name } = data;
          let { feels_like } = data.main;
          let { id, main } = data.weather[0];

          locationValue.textContent = name;
          climate.textContent = main;
          temperatureValue.textContent = Math.round(feels_like - 273);
          if (id < 300 && id > 200) {
            temperatureIcon.src = "./icons/thunderstorm.svg";
          } else if (id < 400 && id > 300) {
            temperatureIcon.src = "./icons/cloud-solid.svg";
          } else if (id < 600 && id > 500) {
            temperatureIcon.src = "./icons/rain.svg";
          } else if (id < 700 && id > 600) {
            temperatureIcon.src = "./icons/snow.svg";
          } else if (id < 800 && id > 700) {
            temperatureIcon.src = "./icons/clouds.svg";
          } else if (id == 800) {
            temperatureIcon.src = "./icons/clouds-and-sun.svg";
          }

          console.log(data);
        });
    });
  }
});
