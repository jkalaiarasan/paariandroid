<template>
  <ion-app>
    <ion-split-pane content-id="main-content" v-if="isLogined">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content class="background-image">
          <ion-list id="inbox-list">
            <ion-list-header>Inbox</ion-list-header>
            <ion-note>hi@ionicframework.com</ion-note>

            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
    <ion-content v-else class="background-image">
      <Login />
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
import { ref } from 'vue';
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
import { onMounted } from 'vue';
import Login from './components/Login.vue';

let isLogined = ref(false);

onMounted(() => {
  console.log('Hello World');
});

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
const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}
</script>
<style>
.background-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>