<template>
    <div class="weather-component">
      <div class="weather-icon">
        <img src="http://openweathermap.org/img/w/01d.png" alt="Weather Icon" />
      </div>
      <div class="weather-info">
        <p class="temperature">34°C</p>
        <p class="location">Ganesapuram</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WeatherComponent'
  };
  </script>
  
  <style scoped>
  .weather-component {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3498db;
    color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    height: 100%;
  }
  
  .weather-icon img {
    width: 100px;
    height: 100px;
  }
  
  .weather-info {
    text-align: center;
    margin-left: 20px;
  }
  
  .temperature {
    font-size: 36px;
    font-weight: bold;
    margin: 0;
  }
  
  .location {
    font-size: 18px;
    margin: 5px 0;
  }
  </style>
  