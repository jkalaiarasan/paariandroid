<template>
  <ion-app :style="backgroundStyle">
      <TilePage v-if="showTile" @childEvent="handleTileClick" style="height: 100%;"/>
      <Login v-else-if="showLogin" :tile={tile} @childEvent="handleChildEvent" style="height: 100%;"/>
      <template v-else-if="isLogined">
        <ion-content>
          <MainPage :tile={tile} @childEvent="handleMainPageEvent"/>
        </ion-content>
    </template>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
} from '@ionic/vue';
import { ref, computed, onMounted } from 'vue';
import Login from './components/Login.vue';
import TilePage from './components/TilePage.vue';
import MainPage from './components/MainPage.vue';

interface TileType {
  [key: string]: any; // Define the type structure for tile object
}

const showLogin = ref(false);
const isLogined = ref(false);
const showTile = ref(true);
const tile: TileType = {};
import imagePath from './images/background.jpg';
const backgroundStyle = computed(() => `background-image: url(${imagePath});`);

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
