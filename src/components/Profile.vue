<template>
    <div v-if="showSpinner" class="spinner-container">
      <ion-spinner name="lines-small" style="width: 100px; height: 100px;"></ion-spinner>
    </div>
    <div v-else class="profile">
      <template v-if="tile.tile.value === 'paarai'">
        <div class="profile-header">
          <img class="profile-picture" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyjqSxk-RexzyuP1TktCvHsA4XJMrRF7mPWeSs_No_IZArOpDg2P_4psKYSzOBBXyKhXF-kt-1r0pTxTTTtUp1IHDfmsL8gTYC2lpVPt6rC0mKI0h7xwOjxKxm2ha6STRKyE47PeDSWuoNQ_e_FQeM9ybAd4WHNnxL_wWC-G6a5zDj2KdLMoxsjZ63DSs/w552-h320/main.png" alt="Profile Picture" />
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
      </template>
      <template v-else>
        <div class="profile-header">
          <img class="profile-picture" src="../images/BlueMoon.png" alt="Profile Picture" />
        </div>
        <div class="profile-details">
          <div class="detail">
            <h2 class="detail-label">பெயர்</h2>
            <div class="detail-value">{{ memberData.Name }}</div>
          </div>
          <div class="detail">
            <h2 class="detail-label">பதிவு எண்</h2>
            <div class="detail-value">{{ memberData.Member_Id__c }}</div>
          </div>
          <div class="detail">
            <h2 class="detail-label">பொறுப்பு</h2>
            <div class="detail-value">{{ memberData.Position__c }}</div>
          </div>
          <div class="detail">
            <h2 class="detail-label">முகவரி</h2>
            <div class="detail-value">{{ memberData.Address__c }}</div>
          </div>
          <div class="detail">
            <h2 class="detail-label">செல் எண்</h2>
            <div class="detail-value">{{ memberData.Mobile__c }}</div>
          </div>
        </div>
      </template>
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
    mounted(){
        this.getInfo();
    },
    methods:  {
      async updateProfile(){
        const toast = await toastController.create({
          message: 'சுயவிவரத்தை மாற்ற நிர்வாகத்தை தொடர்பு கொள்ளவும்.',
          duration: 2000,
          position: 'top',
          color: 'success',
        });
        await toast.present();
      },

      async getInfo(){
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
          await this.$storage.set('PAARAI', '')
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .profile {
    background-color: #222;
    color: #fff;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .bottom-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .profile-header {
    text-align: center;
    margin-bottom: 20px;
    position: relative;
  }
  
  .profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #fff;
  }
  
  .edit-button {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .profile-details {
    margin-top: 20px;
    text-align: center;
  }
  
  .detail {
    margin-bottom: 15px;
  }
  
  .detail-label {
    font-size: 14px;
    opacity: 0.8;
    font-weight: bold;
  }
  
  .detail-value {
    font-size: 16px;
    font-weight: bold;
  }
  
  .edit-input {
    width: 100%;
    padding: 5px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  </style>
  