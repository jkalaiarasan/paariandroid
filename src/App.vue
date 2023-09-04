<template>
  <ion-app :style="backgroundStyle">
      <ion-content v-if="isLogined">
        <MainPage @childEvent="handleMainPageEvent"/>
      </ion-content>
    <ion-content v-else>
      <Login @childEvent="handleChildEvent" />
    </ion-content>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
} from '@ionic/vue';
import { ref, computed, onMounted } from 'vue';
import Login from './components/Login.vue';
import MainPage from './components/MainPage.vue';

const isLogined = ref(false);
import imagePath from './images/background.jpg';
const backgroundStyle = computed(() => `background-image: url(${imagePath});`);

const handleChildEvent = (result) => {
  isLogined.value = true;
};

const handleMainPageEvent = (result) => {
  isLogined.value = false;
}

onMounted(() => {
  if(localStorage.getItem('PAARAI')){
    isLogined.value = true;
  } else {
    isLogined.value = false;
  }  
});
</script>

<style>
ion-content {
  --background: transparent; /* Makes the ion-content background transparent */
}
</style>
