<template>
  <div v-if="showSpinner" class="spinner-container">
    <ion-spinner name="lines-small" style="width: 80px; height: 80px;"></ion-spinner>
  </div>
  <ion-page>
    <ion-content class="dark-content">
      <ion-list>
        <ion-item-group>
          <ion-item v-for="(newsItem, index) in newsList" :key="index" class="news-item">
            <ion-label>
              <h2 class="news-title">{{ newsItem.title }}</h2>
              <p class="full-description">{{ newsItem.description }}</p>
              <p class="news-meta">சேர்த்தவர்: {{ newsItem.addedBy }}, {{ newsItem.date }}</p>
            </ion-label>
          </ion-item>
        </ion-item-group>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="toggleAccordion" v-if="accordionOpen">
          <i class="bi bi-dash-circle-fill" style="font-size: 3rem;"></i>
        </ion-fab-button>
        <ion-fab-button @click="toggleAccordion" v-else>
          <i class="bi bi-plus-circle-fill" style="font-size: 3rem;"></i>
        </ion-fab-button>
      </ion-fab>
      <div class="add-news-section">
        <div class="add-news-content" :style="{ display: accordionOpen ? 'block' : 'none' }">
          <form @submit="addNews" class="news-form">
            <ion-item>
              <ion-label position="floating">தலைப்பு</ion-label>
              <ion-input required v-model="newNews.title" class="input-field"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">அறிவிப்பு</ion-label>
              <ion-textarea required v-model="newNews.description" class="textarea-field"></ion-textarea>
            </ion-item>
            <ion-button expand="full" type="submit" class="submit-button">சேர்</ion-button>
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
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.dark-header {
  background-color: #1f1f1f;
  color: #e0e0e0;
}

.dark-content {
  background-color: #121212;
  color: #e0e0e0;
}

.dark-divider {
  background-color: #333;
  color: #e0e0e0;
}

.title-label {
  font-weight: bold;
  font-size: 1.2em;
  color: #ffffff;
}

.news-item {
  background-color: #1e1e1e;
  border-radius: 10px;
  margin-bottom: 12px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.news-title {
  font-size: 1.2em;
  color: #ffffff;
  margin: 0;
}

.full-description {
  white-space: pre-line;
  overflow-wrap: break-word;
  color: #cfcfcf;
}

.news-meta {
  font-size: 0.9em;
  color: #999;
}

.add-news-section {
  margin-top: 16px;
}

.add-news-divider {
  cursor: pointer;
  background-color: #333;
  color: #ffffff;
  padding: 12px;
  border-radius: 8px;
}

.add-news-divider:hover {
  background-color: #444;
}

.news-form {
  padding: 16px;
  background-color: #1f1f1f;
  border-radius: 8px;
}

.input-field, .textarea-field {
  --padding-start: 0;
  --padding-end: 0;
}

.submit-button {
  margin-top: 16px;
  background-color: #007bff;
  color: #ffffff;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
