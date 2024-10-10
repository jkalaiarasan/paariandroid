<template>
  <ion-app>
      <!-- <HomePage /> -->
      <TilePage v-if="showTile" @childEvent="handleTileClick" style="height: 100%;"/>
      <Festival v-else-if="festival"/>
      <Login v-else-if="showLogin" :deviceToken={deviceToken} :tile={tile} @childEvent="handleChildEvent" style="height: 100%;"/>
      <template v-else-if="isLogined">
        <ion-content>
          <MainPage :tile={tile} @childEvent="handleMainPageEvent"/>
        </ion-content>
    </template>
  </ion-app>
</template>

<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyAvt7mKOCUAOQAAyGOfzDHiJueweWDXu2s",
  authDomain: "ganesapuram-1458a.firebaseapp.com",
  projectId: "ganesapuram-1458a",
  storageBucket: "ganesapuram-1458a.appspot.com",
  messagingSenderId: "1014758642776",
  appId: "1:1014758642776:web:78d4d0c70fc0cf8766e62d",
  measurementId: "G-QP4Q709XGE"
};

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/ionic.bundle.css';

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

getToken(messaging, { vapidKey: 'BN9ba1kHSmoNW4fXiyrukegXD82PwsSNPCcgqS97iFlzLrTI8V2odKqTWiVaBnJPJwiZCmJhM886kwS3Mp4au9g' }).then((currentToken) => {
  if (currentToken) {
    console.log('currentToken ', currentToken)
    deviceToken.value = currentToken;
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});

import {
  IonApp,
} from '@ionic/vue';
import { ref, computed, onMounted } from 'vue';
import Login from './components/Login.vue';
import TilePage from './components/TilePage.vue';
import MainPage from './components/MainPage.vue';
import HomePage from './components/HomePage.vue';
import Festival from './components/Festival.vue';

interface TileType {
  [key: string]: any; // Define the type structure for tile object
}

const showLogin = ref(false);
const isLogined = ref(false);
const showTile = ref(true);
const festival = ref(false);
const deviceToken = ref('');
const tile: TileType = {};

const handleChildEvent = (result) => {
  showLogin.value = false;
  isLogined.value = true;
};

const handleTileClick = async (result) => {
  tile["value"] = result;  
  isLogined.value = false;
  showTile.value = false;
  if(result === 'paarai' || result === 'group'){
    showLogin.value = true;
  } else if(result == 'festival'){
    festival.value = true;
  } else {
    showLogin.value = false;
    showTile.value = true;
  }
}

const handleMainPageEvent = (result) => {
  isLogined.value = false;
  showLogin.value = false;
  showTile.value = true;
}

onMounted(async() => {
  isLogined.value = false;
});
</script>

<style>
ion-content {
  --background: transparent; /* Makes the ion-content background transparent */
}
</style>
