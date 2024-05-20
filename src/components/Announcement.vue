<template>
    <div v-if="showSpinner" class="spinner-container">
      <ion-spinner name="lines-small" style="width: 100px; height: 100px;"></ion-spinner>
    </div>
    <ion-page>
      <ion-content>
        <ion-list>
          <ion-item-group>
            <ion-item-divider>
              <ion-label>
                அறிவிப்புகள்
              </ion-label>
            </ion-item-divider>
            <ion-item v-for="(newsItem, index) in newsList" :key="index">
              <ion-label>
                <h2>{{ newsItem.title }}</h2>
                <p class="full-description">{{ newsItem.description }}</p>
                <p>சேர்த்தவர்: {{ newsItem.addedBy }}, {{ newsItem.date }}</p>
              </ion-label>
            </ion-item>
          </ion-item-group>
        </ion-list>
        <div>
            <ion-item-divider @click="toggleAccordion">
              <ion-label>
                புதிய அறிவிப்பை சேர்
              </ion-label>
            </ion-item-divider>
            <div class="add-news-content" :style="{ display: accordionOpen ? 'block' : 'none' }">
            <form @submit="addNews">
                <ion-item>
                    <ion-label>தலைப்பு</ion-label>
                    <ion-input required v-model="newNews.title"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>அறிவிப்பு</ion-label>
                    <ion-textarea required v-model="newNews.description"></ion-textarea>
                </ion-item>
                <ion-button expand="full" type="submit">சேர்</ion-button>
            </form>
            </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import axios from 'axios';
  import { serverUrl } from '@/config.js';
  import { toastController } from '@ionic/vue';
  import { IonPage, IonSpinner, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItemGroup, IonItemDivider, IonItem, IonLabel, IonButton, IonInput, IonTextarea } from "@ionic/vue";

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
        IonButton,
        IonInput,
        IonTextarea,
        IonSpinner,
    },
    data() {
      return {
        accordionOpen: false,
        showSpinner: false,
        newNews: {
          title: "",
          description: "",
        },
        newsList: [],
      };
    },
    mounted() {
        this.getNews();
    },
    methods: {
        async displayToast(message, color) {
            const toast = await toastController.create({
                message: message,
                duration: 4000,
                position: 'top',
                color: color,
            });
            await toast.present();
        },
        toggleAccordion() {
            this.accordionOpen = !this.accordionOpen;
        },
        async addNews(event) {
            event.preventDefault();
            this.showSpinner = true;
            const url = serverUrl + '/saveNews';
            const data = {
                token: await this.$storage.get('PAARAI'),
                news: JSON.parse(JSON.stringify(this.newNews)),
            };
            try {
                const response = await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                this.displayToast('உங்கள் அறிவிப்பு மதிப்பாய்வுக்காக சமர்ப்பிக்கப்பட்டது, பரிசீலனைக்குப் பிறகு செய்தி வெளியிடப்படும்', 'success');
                this.showSpinner = false;
            } catch (error) {
                this.showSpinner = false;
            }
        },
        async getNews() {
            this.showSpinner = true;
            const url = serverUrl + '/getNews';
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
                    this.newsList.push({
                        title: element.Title__c,
                        description: element.Description__c,
                        addedBy: element.Member__r.Name,
                        date: element.Created_Date__c,
                    });
                });
                this.showSpinner = false;
            } catch (error) {
                this.showSpinner = false;
            }
        },
    },
  };
  </script>
<style scoped>
ion-item {
  margin-bottom: 16px; /* Adjust spacing as needed */
}

ion-button[type="submit"] {
  margin-top: 16px; /* Adjust spacing as needed */
}
.full-description {
    white-space: pre-line; /* Preserve line breaks in the text */
    overflow-wrap: break-word; /* Wrap long words to the next line */
    word-wrap: break-word; /* Wrap long words to the next line (for older browsers) */
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