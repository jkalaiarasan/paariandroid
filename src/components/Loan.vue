<template>
    <ion-page>
      <ion-content class="ion-padding">
        <div class="detail-text">
          <p>
            உங்களுடைய கணக்கில் எந்த கடனும் இல்லை. தேவையெனில் நிர்வாகத்தை தொடர்பு கொள்ளவும்.
          </p>
          Renganathan : +91 97878 28074 <br/>
          Kalaiarasan : +91 78688 83417
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
  