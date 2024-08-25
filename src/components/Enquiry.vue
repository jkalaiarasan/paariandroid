<template>
    <ion-page>
      <ion-content class="dark-content">
        <ion-list>
          <ion-item-group>
            <ion-item-divider class="dark-divider">
              <ion-label class="title-label">Active Enquiries</ion-label>
            </ion-item-divider>
            <ion-item v-for="(inquiry, index) in enquiries" :key="index" class="inquiry-item">
              <ion-label>
                <h2 class="inquiry-title">{{ inquiry.subject }}</h2>
                <p class="inquiry-details">{{ inquiry.message }}</p>
                <p class="inquiry-meta">{{ inquiry.to }} மீது</p>
              </ion-label>
            </ion-item>
          </ion-item-group>
        </ion-list>
        <ion-list>
          <ion-item-group>
            <ion-item-divider class="dark-divider">
              <ion-label class="title-label">Closed Enquiries</ion-label>
            </ion-item-divider>
            <ion-item v-for="(inquiry, index) in enquiries" :key="index" class="inquiry-item">
              <ion-label>
                <h2 class="inquiry-title">{{ inquiry.subject }}</h2>
                <p class="inquiry-details">{{ inquiry.message }}</p>
                <p class="inquiry-meta">{{ inquiry.to }} மீது</p>
              </ion-label>
            </ion-item>
          </ion-item-group>
        </ion-list>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button @click="goToAddInquiry">
            <ion-icon name="add-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </ion-content>
      <ion-icon name="heart"></ion-icon>
    </ion-page>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItemGroup, IonItemDivider, IonItem, IonLabel, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
  
  export default {
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonList,
      IonItemGroup,
      IonItemDivider,
      IonItem,
      IonLabel,
      IonFab,
      IonFabButton,
      IonIcon
    },
    data() {
      return {
        enquiries: [
          { subject: 'வாட்ஸாப்ப் ஸ்டேட்டஸ்', message: 'வன்முறை ஸ்டேட்டஸ் போடுவது', to: 'கீரிப்பட்டி அபினேஷ்' },
          { subject: 'வாட்ஸாப்ப் ஸ்டேட்டஸ்', message: 'ஸ்டேட்டஸ் போட்டு தொந்தரவு செய்வது.', to: 'லோகேஷ் ரெட்டி' }
        ]
      };
    },
    methods: {
      goToAddInquiry() {
        
      }
    }
  };
  </script>
  
  <style scoped>
  .dark-header {
    background-color: #1f1f1f;
    color: #ffffff;
  }
  
  .dark-content {
    background-color: #121212;
    color: #ffffff;
  }
  
  .dark-divider {
    background-color: #333;
    color: #ffffff;
  }
  
  .title-label {
    font-weight: bold;
    font-size: 1.2em;
    color: #ffffff;
  }
  
  .inquiry-item {
    background-color: #1e1e1e;
    border-radius: 10px;
    margin-bottom: 12px;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s ease-in-out;
  }
  
  .inquiry-item:hover {
    transform: scale(1.02);
  }
  
  .inquiry-title {
    font-size: 1.2em;
    color: #ffffff;
    margin: 0;
  }
  
  .inquiry-details {
    color: #cfcfcf;
  }
  
  .inquiry-meta {
    font-size: 0.9em;
    color: #999;
  }
  
  .ion-fab-button {
    background-color: #007bff;
  }
  
  .ion-fab-button:hover {
    background-color: #0056b3;
  }
  </style>
  