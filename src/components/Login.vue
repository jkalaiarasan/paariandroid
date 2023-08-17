<template>
  <ion-page>
    <ion-header class="header">
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding login-container">
      <div class="logo-container">
        <img class="logo" src="../images/Logo.png" alt="Paarai Boys" /> <!-- Company Logo -->
      </div>
      <div class="login-box">
        <ion-item class="custom-input">
          <ion-icon name="person" slot="start"></ion-icon>
          <ion-input type="text" placeholder="Username" v-model="username"></ion-input>
        </ion-item>
        <ion-item class="custom-input">
          <ion-icon name="lock-closed" slot="start"></ion-icon>
          <ion-input type="password" placeholder="PIN" v-model="pin" maxlength="6"></ion-input>
        </ion-item>
        <ion-button expand="block" @click="login" class="login-button">Login</ion-button>
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
} from '@ionic/vue';
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
  },
  methods: {
    async getToken() {
      console.log('gettoken');
      const url = 'https://login.salesforce.com/services/oauth2/token';
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('client_id', '3MVG9n_HvETGhr3BXtcrwa5G2PBgLFCCJrM0JOXZamLvLVqlknJkcwjJ1zWqq38CJNuhsATh1zuTWeaiLLwIZ');
      params.append('client_secret', '4D4C46A0989975C3002CCD90B4CE4A8619D25401E90AFD93B0977A24A22CA914');
      params.append('username', 'jkalaiarasan@account.com');
      params.append('password', 'Kalai@1997w3ozb4LZc65eydpChToEV8oN6'); // Append the security token if needed
      console.log('77');
      try {
        const response = await axios.post(url, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log('response ', JSON.parse(JSON.stringify(response)));
        const accessToken = response.data.access_token;
        console.log('Access token:', accessToken);

        // You can store the access token or use it as needed
      } catch (error) {
        console.log('error ', error);
        console.error('Authentication failed:', error.response ? error.response.data : error.message);
      }
    },
  },
  mounted() {
    console.log('mounted');
    this.getToken(); // Call the getToken method when the component is mounted
  },
};
</script>

<style scoped>
.login-container {
  
}
ion-toolbar {
  --background: linear-gradient(to right, red, orange);
  --ion-color-base: transparent; /* Additional line to ensure transparency */
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

.login-box {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.custom-input {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 15px;
  margin: 10px 0;
}

ion-button {
  --background: linear-gradient(to right, red, orange);
  --ion-color-base: transparent; /* Additional line to ensure transparency */
}

</style>
