<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col v-for="(user, index) in users" :key="index" size="12">
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>{{ user.name }}</ion-card-subtitle>
                <ion-card-title>{{ user.username }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-avatar>
                  <ion-img :src="user.profileImage" alt="User Avatar"></ion-img>
                </ion-avatar>
                <ion-label>{{ user.bio }}</ion-label>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
  <div v-if="showSpinner" class="spinner-container">
    <ion-spinner name="lines-small"></ion-spinner>
  </div>
</template>

<script>
import axios from 'axios';
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
      const url = 'https://paaraiserver.vercel.app/getMemberList';
      const data = {
        token: localStorage.getItem('PAARAI'),
      };
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        response?.data?.data.forEach(element => {
          let userName = element.Username__c ? element.Username__c : element.Name;
          this.users.push({
            name: `${element.Name} (${element.Paarai_Id__c})`,
            username: '@' + userName,
            profileImage: "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
            bio: element.Work__c,
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
