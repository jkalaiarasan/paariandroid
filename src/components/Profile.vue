<template>
  <div v-if="showSpinner" class="spinner-container">
    <ion-spinner name="lines-small" style="width: 100px; height: 100px;"></ion-spinner>
  </div>
  <div v-else class="profile">
    <div class="profile-picture">
      {{ getInitials(memberData.Name) }}
    </div>
    <div class="profile-details">
      <div class="detail">
        <h2 class="detail-label">பெயர்</h2>
        <div class="detail-value">{{ memberData.Name }}</div>
      </div>
      <div class="detail">
        <h2 class="detail-label">பதிவு எண்</h2>
        <div class="detail-value">{{ memberData.Paarai_Id__c }}</div>
      </div>
      <div class="detail">
        <h2 class="detail-label">பொறுப்பு</h2>
        <div class="detail-value">{{ memberData.Position__c }}</div>
      </div>
      <div class="detail">
        <h2 class="detail-label">பிறந்த தேதி</h2>
        <div class="detail-value">{{ memberData.Date_of_Birth__c }}</div>
      </div>
      <div class="detail">
        <h2 class="detail-label">வேலை</h2>
        <div class="detail-value">{{ memberData.Work__c }}</div>
      </div>
      <div class="detail">
        <h2 class="detail-label">இடம்</h2>
        <div class="detail-value">{{ memberData.Location__c }}</div>
      </div>
      <div class="detail">
        <h2 class="detail-label">செல் எண்</h2>
        <div class="detail-value">{{ memberData.Phone_Number__c }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { serverUrl } from '@/config.js';
import axios from 'axios';
import { toastController } from '@ionic/vue';
import { IonSpinner } from '@ionic/vue';

export default {
  components: { IonSpinner },
  data() {
    return {
      showSpinner: true,
      memberData: {},
    }
  },
  props: {
    tile: Object,
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInitials(name) {
      return name ? name.charAt(0).toUpperCase() : '';
    },
    async updateProfile() {
      const toast = await toastController.create({
        message: 'சுயவிவரத்தை மாற்ற நிர்வாகத்தை தொடர்பு கொள்ளவும்.',
        duration: 2000,
        position: 'top',
        color: 'success',
      });
      await toast.present();
    },

    async getInfo() {
      const url = serverUrl + '/getMemberInfo';
      const data = {
        isPaarai: this.tile.tile.value === 'paarai',
        token: this.tile.tile.value === 'paarai' ? await this.$storage.get('PAARAI') : await this.$storage.get('GROUP'),
      };
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.memberData = response?.data?.data;
        this.showSpinner = false;
      } catch (error) {
        this.showSpinner = false;
        await this.$storage.set('PAARAI', '');
      }
    }
  }
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
.profile {
  /* background-color: #f5f6f8;
  color: #333; */
  padding: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  --background: #121212; /* Dark background for a modern look */
  color: #e0e0e0;
}

.name-icon {
  font-size: 24px;
  margin-right: 8px;
  vertical-align: middle;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-details {
  /* background-color: #fff; */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  padding-top: 0px;
  width: 100%;
  max-width: 600px;
}

.detail {
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.detail:last-of-type {
  border-bottom: none;
}

.detail-label {
  font-size: 14px;
  color: #555;
  font-weight: 600;
  margin-bottom: 5px;
}

.detail-value {
  font-size: 16px;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #0056b3;
}

.edit-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
