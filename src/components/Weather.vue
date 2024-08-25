<template>
  <ion-page>
    <div v-if="showSpinner" class="spinner-container">
      <ion-spinner name="lines-small" style="width: 100px; height: 100px;"></ion-spinner>
    </div>
    <ion-content class="ion-padding" v-else>
      <div class="current-time">{{ currentTime }}</div>
      <div class="day-of-week">{{ tamilDayOfWeek }}</div>
      <div class="weather-container">
        <div class="location">
          <svg class="loc" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 512 512"><circle cx="256" cy="192" r="32" fill="currentColor"/><path fill="currentColor" d="M256 32c-88.22 0-160 68.65-160 153c0 40.17 18.31 93.59 54.42 158.78c29 52.34 62.55 99.67 80 123.22a31.75 31.75 0 0 0 51.22 0c17.42-23.55 51-70.88 80-123.22C397.69 278.61 416 225.19 416 185c0-84.35-71.78-153-160-153Zm0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64Z"/></svg>
          <div class="location-details">
            <div class="location-name">Paarai, Ganesapuram</div>
            <div class="location-region">{{ weatherData.location.region }}</div>
            <div class="location-country">{{ weatherData.location.country }}</div>
          </div>
        </div>
        <div class="temperature">{{ weatherData.current.temp_c }}°C</div>
        <div class="condition">{{ weatherData.current.condition.text }}</div>
        <img class="icon" :src="weatherData.iconURL" alt="Weather Icon">
        <div class="sunrise-sunset">
          <div class="sunrise">
            <i class="bi bi-sunrise"></i>
            சூரிய உதயம்: {{ weatherData.forecast.forecastday[0].astro.sunrise }}
          </div>
          <div class="sunset">
            <i class="bi bi-sunset"></i>
            சூரிய அஸ்தமனம்: {{ weatherData.forecast.forecastday[0].astro.sunset }}
          </div>
          <div class="moonrise">
            <i class="bi bi-cloud-moon"></i>
            சந்திர உதயம்: {{ weatherData.forecast.forecastday[0].astro.moonrise }}
          </div>
          <div class="moonset">
            <i class="bi bi-cloud-moon-fill"></i>
            சந்திர அஸ்தமனம்: {{ weatherData.forecast.forecastday[0].astro.moonset }}
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { serverUrl } from '@/config.js';
import { IonPage, IonContent, IonIcon, IonSpinner } from '@ionic/vue';
import { toastController } from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonSpinner,
  },
  data() {
    return {
      weatherData: {},
      showSpinner: true,
      currentTime: new Date().toLocaleString(),
      tamilDayOfWeek: '',
    };
  },
  mounted() {
    this.getWeather();
    this.getTamilDayOfWeek();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      this.currentTime = new Date().toLocaleString();
    },
    getTamilDayOfWeek() {
      const daysOfWeek = [
        "ஞாயிறு",
        "திங்கள்",
        "செவ்வாய்",
        "புதன்",
        "வியாழன்",
        "வெள்ளி",
        "சனி"
      ];
      
      const currentDate = new Date();
      this.tamilDayOfWeek = daysOfWeek[currentDate.getDay()];
    },
    async displayToast(message, color) {
      const toast = await toastController.create({
        message: message,
        duration: 2000,
        position: 'top',
        color: color,
      });
      await toast.present();
    },
    async getWeather() {
      this.showSpinner = true;
      const url = serverUrl + '/getWeather';
      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let weatherData = response.data.data;
        weatherData.iconURL = 'https:' + weatherData?.current?.condition?.icon;
        this.weatherData = weatherData;
        this.showSpinner = false;
      } catch (error) {
        this.showSpinner = false;
        this.displayToast('Error', 'danger');
      }
    },
  },
};
</script>

<style scoped>
/* Background color for the entire page */
ion-content {
  --background: #121212; /* Dark background for a modern look */
  color: #e0e0e0; /* Light text color for contrast */
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
}

.weather-container {
  text-align: center;
  padding: 20px;
  background-color: #1e1e1e; /* Dark background for the weather container */
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
  color: #f0f0f0;
}

.current-time, .day-of-week {
  font-size: 19px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
}

.location {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #00bcd4; /* Light cyan color for location text */
}

.loc {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.location-details {
  text-align: left;
}

.location-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.location-region, .location-country {
  font-size: 14px;
}

.temperature {
  font-size: 50px;
  font-weight: bold;
}

.condition {
  font-size: 20px;
  margin: 10px 0;
}

.icon {
  width: 80px;
  height: 80px;
  margin: 10px 0;
}

.sunrise-sunset {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sunrise-sunset > div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
}

.bi {
  margin-right: 10px;
  font-size: 18px;
}
</style>