<template>
  <div v-if="fullSpinner" class="spinner-container">
    <ion-spinner name="lines-small" style="width: 100px; height: 100px;"></ion-spinner>
    </div>
  <ion-page v-else>
    <ion-header class="header">
    <ion-toolbar>
      <div class="center-align">
        <ion-title v-if="tile.tile.value == 'paarai'">Login to Your Account</ion-title>
        <ion-title v-else>ப்ளூ மூன் சுய உதவி குழு</ion-title>
        <span v-if="tile.tile.value == 'paarai'"><p>Connect with friends.</p></span>
        <span v-else><p>(Universal Paarai Boys Undertaking)</p></span>
      </div>
    </ion-toolbar>
  </ion-header>
    <ion-content class="ion-padding" scroll-y="false">
      <div class="logo-container" v-if="tile.tile.value == 'paarai'">
        <img class="logo" src="../images/Logo.png" alt="Paarai Boys" />
      </div>
      <div class="logo-container" v-else>
        <img class="logo" src="../images/BlueMoon.png" alt="Paarai Boys" />
      </div>
      <div class="login-box">
        <form @submit="getToken">
          <ion-item class="custom-input">
            <ion-icon name="person" slot="start"></ion-icon>
            <ion-input type="text" required placeholder="Username" v-model="username"></ion-input>
          </ion-item>
          <ion-item class="custom-input">
            <ion-icon name="lock-closed" slot="start"></ion-icon>
            <ion-input
              type="password"
              inputmode="numeric"
              pattern="[0-9]*"
              required
              placeholder="PIN"
              v-model="pin"
              maxlength="6"
              minlength="4"
            ></ion-input>
          </ion-item>
          <div class="forgot-pin-container">
            <a href="#" class="forgot-pin">Forgot PIN?</a>
          </div>
          <ion-button type="submit" expand="block" class="login-button">Login</ion-button>
        </form>
        <div class="register-container" v-if="tile.tile.value == 'paarai'">
          <span>Not a member yet? </span>
          <a target="_blank" href="https://account-dev-ed.develop.my.site.com/paaraiboys/s/" class="register-link">Register Now</a>
        </div>
        <div class="icons-container" style="text-align: center;" v-if="tile.tile.value == 'paarai'">
          <a href="https://chat.whatsapp.com/EDIKebHp12O9Bb4zf6G7Yc" target="_blank">
            <i class="bi bi-whatsapp"></i>
          </a>
          <a href="https://www.instagram.com/direct/t/6419140178167487/" target="_blank">
            <i class="bi bi-instagram"></i>
          </a>
        </div>
      </div>
      <div style="text-align: center;">
        <a href="#">முகப்பு பக்கம்</a>
      </div>
    </ion-content>
    <div v-if="showSpinner" class="spinner-container">
      <ion-spinner name="lines-small" style="width: 100px; height: 100px;"></ion-spinner>
    </div>
  </ion-page>
</template>


<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonIcon,
  IonInput,
  IonButton,
  IonSpinner,
} from '@ionic/vue';
import { toastController } from '@ionic/vue';
import axios from 'axios';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonIcon,
    IonInput,
    IonButton,
    IonSpinner,
  },
  props: {
    tile: Object,
  },
  data() {
    return {
      username: '',
      pin: '',
      showSpinner: false,
      fullSpinner: true,
    };
  },
  created() {
      this.checkLogined();
  },
  methods: {
    async displayToast(message, color) {
      const toast = await toastController.create({
        message: message,
        duration: 2000,
        position: 'top',
        color: color,
      });
      await toast.present();
    },
    async getToken(event) {
      event.preventDefault();
      this.showSpinner = true;
      const url = 'https://paaraiserver.vercel.app/getToken';
      const data = {
        userName: this.username.toLowerCase(),
        pin: this.pin,
        isPaarai : this.tile.tile.value === 'paarai',
      };
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const responseData = response.data;
        this.showSpinner = false;
        if (!responseData.isError) {
          this.displayToast('Welcome ' + responseData.Name, 'success');
          this.tile.tile.value === 'paarai' ? await this.$storage.set('PAARAI', responseData.token) : await this.$storage.set('GROUP', responseData.token);
          this.$emit('childEvent', responseData.token);
        } else {
          this.displayToast(responseData.message, 'danger');
        }
      } catch (error) {
        this.showSpinner = false;
        this.displayToast('Error', 'danger');
      }
    },
    async checkLogined(){
      const token = this.tile.tile.value === 'paarai' ? await this.$storage.get('PAARAI') : await this.$storage.get('GROUP');
      if(token) {
        this.fullSpinner = false;
        this.$emit('childEvent', token);
      } else {
        this.fullSpinner = false;
      }
    }
  },
};
</script>

<style scoped>
i{
  color: purple;
  font-size: 32px;
  margin-right: 10px;
}
ion-toolbar {
  --background: transparent;
  color: white;
}
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.logo{
  width: 144px;
  border-radius: 22px;
}

.center-align {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  ion-title {
    font-size: 24px; /* Adjust as needed */
    color: #ffffff; /* Pure white color */
    padding-top: 6px;
    font-weight: bold;
  }

  span p {
    font-size: 15px; /* Adjust as needed */
    color: #808080; /* Gray color */
    margin-top: 1px;
  }

  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed; /* This will position the spinner above everything else on the page */
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(31, 27, 27, 0.8); /* This adds a semi-transparent background */
    z-index: 1000; /* This ensures the spinner is above everything else on the page */
  }

.login-box {
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.register-container {
    text-align: center; /* Center align */
    margin: 10px 0;    /* Add margin as needed */
    color: gray;
  }

  .register-link {
    color: #ff6400;    /* Color to match your theme, adjust as needed */
    text-decoration: none; /* Remove underline */
  }

  .register-link:hover {
    text-decoration: underline; /* Add underline on hover */
  }

.custom-input {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 15px;
  margin: 10px 0;
  --background: #474747;
  color: #fff;
}

.custom-input ion-input {
    --background: #474747; /* Make the inner input field background transparent */
    color: #fff;
  }

ion-button {
  --background: linear-gradient(to right, #ff6400, #a04ca3);
  --ion-color-base: transparent; /* Additional line to ensure transparency */
}

.forgot-pin-container {
    text-align: right; /* Align to the right */
    margin: 10px 0;    /* Add margin as needed */
  }

  .forgot-pin {
    color: #808080;   /* Gray color, adjust as needed */
    text-decoration: none; /* Remove underline */
  }

  .forgot-pin:hover {
    text-decoration: underline; /* Add underline on hover */
  }

</style>
