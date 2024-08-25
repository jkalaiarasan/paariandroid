<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col v-for="(user, index) in users" :key="index" size="12">
            <ion-card>
              <ion-card-content>
                <ion-grid>
                  <ion-row>
                    <ion-col size="3">
                      <div class="image-container">
                        <div class="profile-picture">
                          {{ user.first }}
                        </div>
                      </div>
                    </ion-col>
                    <ion-col size="9">
                      <ion-card-header>
                        <ion-card-title style="font-weight: bold;">{{ user.name }}</ion-card-title>
                        <ion-card-subtitle>{{ user.id }}</ion-card-subtitle>
                        <ion-card-subtitle>{{ user.username }}</ion-card-subtitle>
                        <ion-card-subtitle>{{ user.bio }}</ion-card-subtitle>
                        <ion-card-subtitle>{{ user.location }}</ion-card-subtitle>
                      </ion-card-header>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
  <div v-if="showSpinner" class="spinner-container">
    <ion-spinner name="lines-small" style="width: 100px; height: 100px;"></ion-spinner>
  </div>
</template>

<script>
import axios from 'axios';
import { serverUrl } from '@/config.js';
import { toastController } from '@ionic/vue';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonAvatar, IonImg, IonLabel, IonSpinner } from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonAvatar,
    IonImg,
    IonSpinner,
    IonLabel,
  },
  props: {
      tile: Object,
  },
  data() {
    return {
      users: [],
      showSpinner: false,
    };
  },
  mounted() {
    this.getMemberList();
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
    async getMemberList() {
      this.showSpinner = true;
      const url = serverUrl + '/getMemberList';
      const data = {
        isPaarai:  this.tile.tile.value === 'paarai',
        token: this.tile.tile.value === 'paarai' ? await this.$storage.get('PAARAI') : await this.$storage.get('GROUP'),
      };
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('response ', response);
        response?.data?.data.forEach(element => {
          let userName = element.Username__c ? element.Username__c : element.Name;
          this.users.push({
            name: element.Name,
            first: element.Name.charAt(0).toUpperCase(),
            id: element.Paarai_Id__c,
            username: '@' + userName,
            bio: element.Work__c,
            location: element.Location__c,
          });
        });
        this.memberDetail = response?.data?.data;
        this.showSpinner = false;
      } catch (error) {
        this.showSpinner = false;
        this.displayToast('Error', 'danger');
      }
    },
  },
};
</script>

<style scoped>
.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #606162;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
}
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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
</style>
