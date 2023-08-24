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
                    <ion-img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyjqSxk-RexzyuP1TktCvHsA4XJMrRF7mPWeSs_No_IZArOpDg2P_4psKYSzOBBXyKhXF-kt-1r0pTxTTTtUp1IHDfmsL8gTYC2lpVPt6rC0mKI0h7xwOjxKxm2ha6STRKyE47PeDSWuoNQ_e_FQeM9ybAd4WHNnxL_wWC-G6a5zDj2KdLMoxsjZ63DSs/w552-h320/main.png" alt="User Avatar"></ion-img>
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
  export default {
    data() {
      return {
        users: [],
        showSpinner: false,
      };
    },
    mounted(){
        this.getMemberList();
    },
    methods: {
        async getMemberList(){
            this.showSpinner = true;
            const url = 'https://paaraiserver.vercel.app/getMemberList';
            const data = {
                token: localStorage.getItem('PAARAI')
            };
            console.log('data ', data);
            try {
                const response = await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
            });
            response?.data?.data.forEach(element => {
                this.users.push({
                    name: `${element.Name__c} (${element.Paarai_Id__c})`,
                    username: '@' + element.Username__c,
                    profileImage: "link_to_image1.jpg",
                    bio: element.Work__c,
                });
            });
            this.memberDetail = response?.data?.data;
            this.showSpinner = false;
            } catch (error) {
                this.showSpinner = false;
                this.displayToast('Error', 'danger');
            }
        }
    }
  };
  </script>
  
  <style scoped>
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
  