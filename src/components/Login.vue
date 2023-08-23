<template>
  <ion-page>
    <ion-header class="header">
    <ion-toolbar>
      <div class="center-align">
        <ion-title>Login to Your Account</ion-title>
        <span><p>Connect with friends.</p></span>
      </div>
    </ion-toolbar>
  </ion-header>
    <ion-content class="ion-padding" scroll-y="false">
      <div class="logo-container">
        <img class="logo" src="../images/Logo.png" alt="Paarai Boys" /> <!-- Company Logo -->
      </div>
      <div class="login-box">
        <form @submit="getUserInfo">
          <ion-item class="custom-input">
            <ion-icon name="person" slot="start"></ion-icon>
            <ion-input type="text" required placeholder="Username" v-model="username"></ion-input>
          </ion-item>
          <ion-item class="custom-input">
            <ion-icon name="lock-closed" slot="start"></ion-icon>
            <ion-input type="password" required placeholder="PIN" v-model="pin" maxlength="6" minlength="4"></ion-input>
          </ion-item>
          <div class="forgot-pin-container">
            <a href="#" class="forgot-pin">Forgot PIN?</a>
          </div>
          <ion-button type="submit" expand="block" class="login-button">Login</ion-button>
        </form>
        <div class="register-container">
          <span>Not a member yet? </span>
          <a href="" class="register-link">Contact Now</a>
        </div>
        <div class="icons-container">
          <a href="#" target="_blank">
            <ion-icon name="logo-whatsapp"></ion-icon> <!-- WhatsApp Icon -->
          </a>
          <a href="#" target="_blank">
            <ion-icon name="logo-instagram"></ion-icon> <!-- Instagram Icon -->
          </a>
        </div>
      </div>
    </ion-content>
    <div v-if="showSpinner" class="spinner-container">
      <ion-spinner name="lines-small"></ion-spinner>
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
  data() {
    return {
      username: '',
      pin: '',
      showSpinner: false,
    };
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
    async getUserInfo(event) {
      event.preventDefault();
      this.showSpinner = true;
      const url = 'http://localhost:3000/getUserInfo';
      const data = {
        userName: this.username.toLowerCase(),
        pin: this.pin
      };
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const responseData = response.data;
        this.showSpinner = false;
        if (responseData?.records?.length > 0) {
          let name = responseData?.records[0]?.Name__c;
          let pin = responseData?.records[0]?.PIN__c;
          if(pin == this.pin){
            this.displayToast('Welcome ' + name, 'success');
            this.$emit('childEvent', responseData?.records[0]);
          } else {
            this.displayToast('Incorrect pin', 'danger');
          }
        } else {
          this.displayToast('No user found', 'danger');
        }
      } catch (error) {
        this.showSpinner = false;
        this.displayToast('Error', 'danger');
      }
    },
  },
};
</script>

<style scoped>
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
