<template>
  <ion-app :style="backgroundStyle">
      <ion-content v-if="isLogined">
        <Profile />
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
import Profile from './components/Profile.vue';

const isLogined = ref(true);
import imagePath from './images/background.jpg';
const backgroundStyle = computed(() => `background-image: url(${imagePath});`);
const selectedIndex = ref(0);
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
  console.log('data ', result);
  isLogined.value = true;
  console.log('105');
};

onMounted(() => {
  const path = window.location.pathname.split('folder/')[1];
  if (path !== undefined) {
    selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
  }
});
</script>

<style>
ion-content {
  --background: transparent; /* Makes the ion-content background transparent */
}
</style>
