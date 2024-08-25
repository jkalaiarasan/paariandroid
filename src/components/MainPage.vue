<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title class="bold">{{ pageTitle }}</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-menu content-id="main-content">
        <ion-content>
          <div class="rounded-image-container">
            <img class="rounded-image" src="../images/Logo.png" alt="Rounded Image" />
          </div>
          <ion-list>
            <ion-item v-for="menuItem in filteredMenuItems" :key="menuItem.id" @click="handleItemClick(menuItem)">
              <i :class="menuItem.iconClass" style="margin-right: 10px;"></i>
              <ion-label class="bold" style="cursor: pointer;">{{ menuItem.label }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-content id="main-content">
        <ChangePin v-if="isChangePin" />
        <Profile :tile="tile" v-if="isProfile"/>
        <Weather v-if="isWeather"/>
        <Members :tile="tile" v-if="isMember"/>
        <Events v-if="isEvent"/>
        <Enquiry v-if="isEnquiry"/>
        <Announcement v-if="isAnnouncement"/>
        <Savings v-if="isSavings"/>
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
    import Enquiry from './Enquiry.vue';
    import Weather from './Weather.vue';
    import Announcement from './Announcement.vue';
    import Savings from './Savings.vue';
    import { toastController } from '@ionic/vue';
    export default {
        name: "MenuLayout",
        props: {
          menuOptions: Array,
          tile: Object,
        },
        components: {
            ChangePin,Weather,Members,Events,Announcement,Savings,Enquiry,
            Profile,IonLabel, IonItem,
            IonSpinner,IonButtons,IonTitle,IonToolbar,IonHeader,
            IonPage,IonMenu, IonContent,IonList,IonMenuButton,
        },
        data() {
            return {
            pageTitle: "சுயவிவரம்",
            isChangePin: false,
            isProfile: true,
            isEnquiry: false,
            showSpinner: false,
            memberDetail: Object,
            isWeather: false,
            isMember: false,
            isEvent: false,
            isAnnouncement: false,
            isSavings: false,
            menuItems: [
                { id: 1, label: "சுயவிவரம்", value: "Profile", iconClass: "bi bi-person"},
                { id: 2, label: "உறுப்பினர்கள்", value: "Member", iconClass : "bi bi-people"},
                // { id: 3, label: "PIN ஐ மாற்று", value: "ChangePin", disabled: true},
                { id: 4, label: "வானிலை", value: "Weather", iconClass: "bi bi-cloud-drizzle-fill"},
                { id: 5, label: "அறிவிப்புகள்", value: "Announcement", iconClass: "bi bi-megaphone"},
                { id: 5, label: "விசாரணைகள்", value: "Enquiries", iconClass : "bi bi-basket"},
                { id: 12, label: "நிகழ்வுகள்", value: "Event", iconClass: "bi bi-calendar-event"},
                { id: 9, label: "வெளியேறு", value: "Logout", iconClass: "bi bi-box-arrow-right"},
                { id: 10, label: "Home Page", value: "HomePage", iconClass: "bi bi-house-door-fill"},
            ]
            };
        },
        computed: {
          filteredMenuItems() {
            return this.menuItems.filter(menuItem => {
              if (this.tile.tile.value !== 'paarai' && (menuItem.value === 'Announcement' || menuItem.value === 'Weather')) {
                return false;
              }
              if (this.tile.tile.value == 'paarai' && (menuItem.value === 'GroupCost' || menuItem.value === 'Loan' || menuItem.value === 'Savings')) {
                return false;
              }
              return true;
            });
          },
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
                this.isAnnouncement = menuItem.value === "Announcement";
                this.isEnquiry = menuItem.value === "Enquiries";
                this.isSavings = menuItem.value === "Savings";
                if(menuItem.value === "HomePage"){
                  window.location.reload();
                }
                if(menuItem.value === "Logout"){
                  if(this.tile.tile.value === 'paarai'){
                    await this.$storage.set('PAARAI', '');
                  } else {
                    await this.$storage.set('GROUP', '');
                  }
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

  .bold{
    font-weight: bold;
  }
  </style>
  