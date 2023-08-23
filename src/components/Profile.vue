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
            <img class="rounded-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZjiq8BMW4H3I_qXluXa0t6Q1ujYSrjKGknIYZfis-&s" alt="Rounded Image" />
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
      </ion-content>
    </ion-page>
  </template>
  
  <script>
    import ChangePin from './ChangePin.vue';
    export default {
        name: "MenuLayout",
        props: {
        pageTitle: String,
        menuOptions: Array,
        },
        components: {
            ChangePin, // This tells Vue that you are intentionally importing the ChangePin component
        },
        data() {
            return {
            pageTitle: "சுயவிவரம்",
            isChangePin: false,
            menuItems: [
                { id: 1, label: "சுயவிவரம்", value: "Profile"},
                { id: 2, label: "உறுப்பினர்கள்", value: "Member"},
                { id: 3, label: "PIN ஐ மாற்று", value: "ChangePin"},
                { id: 4, label: "நிகழ்வுகள்", value: "Event"},
                { id: 5, label: "வானிலை", value: "Weather"},
                { id: 6, label: "வெளியேறு", value: "Logout"},
            ]
            };
        },
        methods: {
            handleItemClick(menuItem) {
                console.log('Clicked Item:', menuItem);
                this.pageTitle = menuItem.label;
                console.log('this.isChangePin ', this.isChangePin);
                this.isChangePin = menuItem.value === "ChangePin";
                console.log('this.isChangePin ', this.isChangePin);
                const menu = document.querySelector('ion-menu');
                menu?.close();
            },
        },
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
  </style>
  