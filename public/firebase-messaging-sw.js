importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyD4U1QPW0NcBmoBJPM8EIP5h_lyH8yG1i4",
    authDomain: "mobile-push-d5660.firebaseapp.com",
    projectId: "mobile-push-d5660",
    storageBucket: "mobile-push-d5660.appspot.com",
    messagingSenderId: "564820865810",
    appId: "1:564820865810:web:1adf81f8af27ca4f3e39cb",
    measurementId: "G-QMKG88Z4HF"
  });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    console.log('payload ', payload)
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/Logo.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });