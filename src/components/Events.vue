<template>
    <div v-if="showSpinner" class="spinner-container">
      <ion-spinner name="lines-small"></ion-spinner>
    </div>
    <ion-content v-else>
      <div v-for="(event, index) in events" :key="index" class="accordion">
        <div class="accordion-header" @click="toggleAccordion(index)">
          {{ event.title }}
          <ion-icon :icon="isOpen(index) ? 'chevron-up-outline' : 'chevron-down-outline'"></ion-icon>
        </div>
        <div v-if="isOpen(index)" class="accordion-content">
          <p>பொறுப்பு <b>{{ event.incharge }}</b> </p>
          <span v-if="event.isDate">
            <p>ஆரம்ப தேதி <b>{{ event.startDate }}</b> </p>
            <p>முடிவு தேதி <b>{{ event.endDate }}</b> </p>
          </span>
          <span v-else>
            <p>தேதி <b>{{ event.startDate }}</b> </p>
          </span>
          <div v-for="(competition, compIndex) in event.competitions" :key="compIndex" style="margin-left: 20px; margin-top: 30px;">
            <p>போட்டி <b>{{ competition.name }}</b></p>
            <p>பொறுப்பாளர் <b>{{ competition.incharge }}</b></p>
          </div>
        </div>
      </div>
    </ion-content>
    
  </template>
  
  <script>
  import axios from 'axios';
  import { IonContent, IonIcon, IonSpinner } from "@ionic/vue";
  import { toastController } from '@ionic/vue';
  
  export default {
    components: {
      IonContent, IonIcon, IonSpinner
    },
    data() {
      return {
        events: [],
        openIndex: null,
        showSpinner: false,
      };
    },
    mounted() {
        this.showSpinner = true;
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
            this.showSpinner = true;
            const url =  'https://paaraiserver.vercel.app/getEventList' ; //'/getEventList';
            const data = {
                token: await this.$storage.get('PAARAI'),
            };
            try {
                const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                response?.data?.data.forEach(element => {
                  const competitions = [];
                  element.Competitions__r?.records?.forEach(competition => {
                    competitions.push({
                      name: competition.Name,
                      incharge: competition.Incharge__r.Name,
                    });
                  });
                  this.events.push({
                      title: element.Name,
                      startDate: element.Start_Date__c,
                      endDate: element.End_Date__c,
                      incharge: element.Member__r?.Name,
                      isDate: element.Start_Date__c !== element.End_Date__c,
                      competitions: competitions,
                  });
                });
                this.showSpinner = false;
            } catch (error) {
                this.showSpinner = false;
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
  
  <style scoped>
  ion-content {
    --ion-text-color: #607D8B;
  }

  b{
    color: #a41a68;
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