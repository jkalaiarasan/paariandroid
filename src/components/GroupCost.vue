<template>
    <ion-page>
      <ion-content class="ion-padding">
        <div class="detail-text">
          <p>
            இந்த மெனு விரைவில் புதுப்பிக்கப்படும்
          </p>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { IonButton } from '@ionic/vue';
  
  export default {
    components: {
      IonButton,
    },
    setup() {
      // Your component logic here
  
      const handleButtonClicked = () => {
        // Handle button click logic here
      };
  
      return {
        handleButtonClicked,
      };
    },
  };
  </script>
  