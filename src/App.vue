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
  apiKey: "AIzaSyD4U1QPW0NcBmoBJPM8EIP5h_lyH8yG1i4",
  authDomain: "mobile-push-d5660.firebaseapp.com",
  projectId: "mobile-push-d5660",
  storageBucket: "mobile-push-d5660.appspot.com",
  messagingSenderId: "564820865810",
  appId: "1:564820865810:web:1adf81f8af27ca4f3e39cb",
  measurementId: "G-QMKG88Z4HF"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

getToken(messaging, { vapidKey: 'BKgfF-V0kzfTaG5d7UIKM3pu5MolPlkJqkGCdXRyJmjDsClkmJ6exuewi9EpnY-6b49rQ9AwtDc_8wVW7kHAi80' }).then((currentToken) => {
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
