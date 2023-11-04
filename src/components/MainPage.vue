<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ pageTitle }}</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-menu content-id="main-content">
        <ion-content>
          <div class="rounded-image-container">
            <img class="rounded-image" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyjqSxk-RexzyuP1TktCvHsA4XJMrRF7mPWeSs_No_IZArOpDg2P_4psKYSzOBBXyKhXF-kt-1r0pTxTTTtUp1IHDfmsL8gTYC2lpVPt6rC0mKI0h7xwOjxKxm2ha6STRKyE47PeDSWuoNQ_e_FQeM9ybAd4WHNnxL_wWC-G6a5zDj2KdLMoxsjZ63DSs/w552-h320/main.png" alt="Rounded Image" />
          </div>
          <ion-list>
            <ion-item v-for="menuItem in menuItems" :key="menuItem.id" @click="handleItemClick(menuItem)">
              <ion-label style="cursor: pointer;">{{ menuItem.label }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-content id="main-content">
        <ChangePin v-if="isChangePin" />
        <Profile v-if="isProfile"/>
        <Weather v-if="isWeather"/>
        <Members v-if="isMember"/>
        <Events v-if="isEvent"/>
        <News v-if="isNews"/>
      </ion-content>
    </ion-page>
    <div v-if="showSpinner" class="spinner-container">
      <ion-spinner name="lines-small" style="width: 100px; height: 100px;"></ion-spinner>
    </div>
  </template>
  
  <script>
  import {
    IonSpinner,IonPage,IonMenu, IonContent,IonList,IonMenuButton,IonButtons,IonTitle, IonToolbar,IonHeader,IonLabel, IonItem,
  } from '@ionic/vue';
    import ChangePin from './ChangePin.vue';
    import Profile from './Profile.vue';
    import Events from './Events.vue';
    import Members from './Members.vue';
    import Weather from './Weather.vue';
    import News from './News.vue';
    import { toastController } from '@ionic/vue';
    export default {
        name: "MenuLayout",
        props: {
          menuOptions: Array,
        },
        components: {
            ChangePin,Weather,Members,Events,News,
            Profile,IonLabel, IonItem,
            IonSpinner,IonButtons,IonTitle,IonToolbar,IonHeader,
            IonPage,IonMenu, IonContent,IonList,IonMenuButton,
        },
        data() {
            return {
            pageTitle: "சுயவிவரம்",
            isChangePin: false,
            isProfile: true,
            showSpinner: false,
            memberDetail: Object,
            isWeather: false,
            isMember: false,
            isEvent: false,
            isNews: false,
            menuItems: [
                { id: 1, label: "சுயவிவரம்", value: "Profile"},
                { id: 2, label: "உறுப்பினர்கள்", value: "Member"},
                { id: 3, label: "PIN ஐ மாற்று", value: "ChangePin"},
                // { id: 4, label: "நிகழ்வுகள்", value: "Event"},
                { id: 5, label: "வானிலை", value: "Weather"},
                { id: 6, label: "செய்திகள்", value: "News"},
                { id: 7, label: "வெளியேறு", value: "Logout"},
                { id: 7, label: "<--- முகப்பு பக்கம்", value: "HomePage"},
            ]
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
            async handleItemClick(menuItem) {
                this.pageTitle = menuItem.label;
                this.isChangePin = menuItem.value === "ChangePin";
                this.isProfile = menuItem.value === "Profile";
                this.isWeather = menuItem.value === "Weather";
                this.isMember = menuItem.value === "Member";
                this.isEvent = menuItem.value === "Event";
                this.isNews = menuItem.value === "News";
                if(menuItem.value === "HomePage"){
                  window.location.reload();
                }
                if(menuItem.value === "Logout"){
                  await this.$storage.set('PAARAI', '');
                  this.$emit('childEvent', 'logout');
                }
                const menu = document.querySelector('ion-menu');
                menu?.close();
            },
          }
    };
  </script>
  
  <style scoped>
  .rounded-image-container {
    text-align: center;
    padding: 20px;
    }

    .rounded-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
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
  </style>
  