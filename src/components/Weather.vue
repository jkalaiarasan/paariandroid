<template>
  <ion-page>
    <div v-if="showSpinner" class="spinner-container">
      <ion-spinner name="lines-small" style="width: 100px; height: 100px;"></ion-spinner>
    </div>
    <ion-content class="ion-padding" v-else>
      <div style="text-align: center; color: darkgrey;" class="current-time">{{ currentTime }}</div>
      <div style="text-align: center; color: darkgrey;" class="current-time">{{ tamilDayOfWeek }}</div>
      <div class="weather-container">
        <div class="location">
          <svg class="loc" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><circle cx="256" cy="192" r="32" fill="currentColor"/><path fill="currentColor" d="M256 32c-88.22 0-160 68.65-160 153c0 40.17 18.31 93.59 54.42 158.78c29 52.34 62.55 99.67 80 123.22a31.75 31.75 0 0 0 51.22 0c17.42-23.55 51-70.88 80-123.22C397.69 278.61 416 225.19 416 185c0-84.35-71.78-153-160-153Zm0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64Z"/></svg>
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
              சந்திர உதயம்: {{weatherData.forecast.forecastday[0].astro.moonrise }}
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
  --background: black;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.weather-container {
  text-align: center;
  padding: 20px;
  background-color: black;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  color: grey;
}

.location {
  align-items: center;
  font-size: 18px;
  color: teal;
}

.loc{
  width: 70px;
  height: 70px;
}

.location ion-icon {
  margin-right: 10px;
  font-size: 24px;
}

.location-details {
  display: flex;
  flex-direction: column;
}

.location-name {
  font-weight: bold;
  margin-bottom: 2px;
}

.location-region,
.location-country {
  font-size: 14px;
}

.temperature {
  font-size: 48px;
  font-weight: bold;
  padding-top: 20px;
}

.condition {
  font-size: 18px;
}

.icon {
  width: 100px;
  height: 100px;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(31, 27, 27, 0.8);
  z-index: 1000;
}
</style>