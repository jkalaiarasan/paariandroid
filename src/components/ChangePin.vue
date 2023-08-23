<template>
    <ion-page>
      <ion-content class="change-pin-content">
        <form @submit="submitForm" class="change-pin-form">
          <ion-list class="form-list">
            <ion-item class="form-item" lines="none">
              <ion-label class="form-label" position="stacked" color="primary">
                Old PIN
              </ion-label>
              <ion-input v-model="currentPin" type="text" required class="form-input"></ion-input>
            </ion-item>
            <ion-item class="form-item" lines="none">
              <ion-label class="form-label" position="stacked" color="secondary">
                New PIN
              </ion-label>
              <ion-input v-model="newPin" type="password" required class="form-input"></ion-input>
            </ion-item>
            <ion-item class="form-item" lines="none">
              <ion-label class="form-label" position="stacked" color="tertiary">
                Confirm New PIN
              </ion-label>
              <ion-input v-model="confirmPin" type="password" required class="form-input"></ion-input>
            </ion-item>
          </ion-list>
          <ion-button expand="block" type="submit" class="submit-button" color="success">Update PIN</ion-button>
        </form>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  export default {
    name: "ChangePin",
    data() {
      return {
        securityKey: "🔒",
        currentPin: "",
        newPin: "",
        confirmPin: ""
      };
    },
    methods: {
      submitForm(event) {
        event.preventDefault();
  
        if (this.newPin === this.confirmPin) {
          console.log("Abracadabra! PIN updated successfully! 🎩✨");
        } else {
          console.log("Oops! Magic failed. The PINs don't match. 🪄🚫");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .change-pin-content {
    background-color: #222222;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .change-pin-form {
    padding: 30px;
    border-radius: 10px;
    animation: fade-in 0.5s ease;
    width: 100%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .form-list {
    padding: 0;
  }
  
  .form-item {
    margin-bottom: 20px;
    padding: 0;
  }
  
  .form-label {
    font-size: 18px;
    display: block;
    position: relative;
    color: #ffffff;
    animation: label-float 0.3s ease;
  }
  
  .form-input {
    border: 2px solid #666666;
    padding: 12px;
    font-size: 16px;
    width: 100%;
    border-radius: 5px;
    color: #333333;
    animation: input-slide-up 0.5s ease;
  }
  
  .submit-button {
    margin-top: 20px;
    font-size: 18px;
    animation: fade-in 0.5s ease;
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes label-float {
    from {
      transform: translateY(15px);
    }
    to {
      transform: translateY(0);
    }
  }
  
  @keyframes input-slide-up {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .form-label{
    margin-bottom: 15px;
  }
  </style>
  