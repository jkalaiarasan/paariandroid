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
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import { ref, computed, onMounted } from 'vue';
import {
  archiveOutline,
  archiveSharp,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from 'ionicons/icons';
import Login from './components/Login.vue';
import MainPage from './components/MainPage.vue';

const isLogined = ref(false);
import imagePath from './images/background.jpg';
const backgroundStyle = computed(() => `background-image: url(${imagePath});`);
const appPages = [
  {
    title: 'Inbox',
    url: '/folder/Inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: 'Outbox',
    url: '/folder/Outbox',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: 'Favorites',
    url: '/folder/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: 'Archived',
    url: '/folder/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: 'Trash',
    url: '/folder/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: 'Spam',
    url: '/folder/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp,
  },
];

const handleChildEvent = (result) => {
  console.log('88');
  
  isLogined.value = true;
};

const handleMainPageEvent = (result) => {
  console.log('result ', result);
  isLogined.value = false;
}

onMounted(() => {
  console.log('99', localStorage.getItem('PAARAI'));
  console.log('100 ', isLogined.value);
  if(localStorage.getItem('PAARAI')){
    console.log('102');
    
    isLogined.value = true;
  } else {
    console.log('106');
    isLogined.value = false;
  }
  console.log('109 ', isLogined.value);
  
});
</script>

<style>
ion-content {
  --background: transparent; /* Makes the ion-content background transparent */
}
</style>
