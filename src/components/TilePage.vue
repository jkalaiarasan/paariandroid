<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title class="bold">Ganesapuram</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <ion-grid class="tiles">
          <ion-row @click="() => clickFunction('paarai')">
            <ion-col size="12">
              <ion-card class="full-width-tile">
                <ion-row>
                    <ion-col size="3" class="image">
                        <img src="../images/Logo.png" alt="Paarai Boys Logo" />
                    </ion-col>
                    <ion-col size="9">
                        <ion-card-header>
                        <ion-card-title class="bold">யுனிவர்சல் பாறை பாய்ஸ்</ion-card-title>
                        </ion-card-header>
                        <ion-card-content class="bold">
                            Stay in touch with friends, check the weather, catch up on the latest news, and more!
                        </ion-card-content>
                    </ion-col>
                </ion-row>
              </ion-card>
            </ion-col>
          </ion-row>
          <ion-row @click="() => clickFunction('tour')">
            <ion-col size="12">
              <ion-card class="full-width-tile">
                <ion-row>
                    <ion-col size="3" class="image">
                        <img src="../images/BlueMoon.png" alt="Blue Moon Holiday & Tourism"/>
                    </ion-col>
                    <ion-col size="9">
                        <ion-card-header>
                        <ion-card-title class="bold">ப்ளூ மூன் ஹாலிடே & டூரிசம்</ion-card-title>
                        </ion-card-header>
                        <ion-card-content class="bold">
                            Explore the World with Blue Moon
                        </ion-card-content>
                    </ion-col>
                </ion-row>
              </ion-card>
            </ion-col>
          </ion-row>
          <ion-row @click="() => clickFunction('festival')">
            <ion-col size="12">
              <ion-card class="full-width-tile">
                <ion-row>
                    <ion-col size="3" class="image">
                        <img src="../images/Festival.png" alt="Festivals"/>
                    </ion-col>
                    <ion-col size="9">
                        <ion-card-header>
                        <ion-card-title class="bold">Festivals</ion-card-title>
                        </ion-card-header>
                        <ion-card-content class="bold">
                          Explore vibrant festivals and celebrate the spirit of togetherness!
                        </ion-card-content>
                    </ion-col>
                </ion-row>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
    import {
      IonApp,
      IonContent,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonPage,
      IonGrid,
      IonRow,
      IonCol,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent
  } from '@ionic/vue';
    export default {
        name: "StylishTiles",
        methods: {
            clickFunction(event) {
                this.$emit('childEvent', event);
            }
        }
    }
  </script>
  
  <style scoped>
  .tiles {
    padding: 10px;
  }

  .image{
    display: flex;
    justify-content: center; /* Horizontally center the child */
    align-items: center; /* Vertically center the child */
  }
  
  .tile {
    background-color: #f5f5f5;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: transform 0.3s;
    margin-bottom: 10px;
  }
  
  .bold{
    font-weight: bold;
  }

  .tile:hover {
    transform: translateY(-5px);
  }
  
  .full-width-tile {
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    transition: transform 0.3s;
    margin-bottom: 10px;
  }
  
  .full-width-tile:hover {
    transform: translateY(-5px);
  }
  
  img {
    max-width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  </style>
  