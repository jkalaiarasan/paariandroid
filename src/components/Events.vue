<template>
    <ion-content>
      <div v-for="(event, index) in events" :key="index" class="accordion">
        <div class="accordion-header" @click="toggleAccordion(index)">
          {{ event.title }}
          <ion-icon :icon="isOpen(index) ? 'chevron-up-outline' : 'chevron-down-outline'"></ion-icon>
        </div>
        <div v-if="isOpen(index)" class="accordion-content">
          {{ event.description }}
        </div>
      </div>
    </ion-content>
    <div v-if="showSpinner" class="spinner-container">
        <ion-spinner name="lines-small"></ion-spinner>
    </div>
  </template>
  
  <style scoped>
  ion-content {
    --ion-text-color: #607D8B;
  }

  .accordion {
    border: 1px solid #ccc;
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
  }
  
  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(31, 27, 27, 0.8);
    z-index: 1000;
    }

  .accordion-content {
    padding: 10px;
  }
  </style>
  
  <script>
  import axios from 'axios';
  import { IonContent, IonIcon, IonSpinner } from "@ionic/vue";
  import { toastController } from '@ionic/vue';
  
  export default {
    components: {
      IonContent,IonIcon, IonSpinner
    },
    data() {
        return {
        users: [],
        events: [],
        showSpinner: false,
        };
    },
    data() {
      return {
        events: [],
        openIndex: null,
      };
    },
    mounted() {
        this.getEventList();
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
        async getEventList() {
            console.log('91');
            this.showSpinner = true;
            const url = 'https://paaraiserver.vercel.app/getEventList';
            const data = {
                token: localStorage.getItem('PAARAI'),
            };
            console.log('97 ', data);
            try {
                const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                console.log('response?.data?.data ', response);
                response?.data?.data.forEach(element => {
                this.events.push({
                    title: element.Name,
                    description: element.Date__c,
                });
                });
                this.memberDetail = response?.data?.data;
                //this.showSpinner = false;
            } catch (error) {
                console.log('error ', error);
                //this.showSpinner = false;
                this.displayToast('Error', 'danger');
            }
        },
      toggleAccordion(index) {
        if (this.openIndex === index) {
          this.openIndex = null;
        } else {
          this.openIndex = index;
        }
      },
      isOpen(index) {
        return this.openIndex === index;
      },
    },
  };
  </script>
  