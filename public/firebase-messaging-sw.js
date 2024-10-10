importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAvt7mKOCUAOQAAyGOfzDHiJueweWDXu2s",
  authDomain: "ganesapuram-1458a.firebaseapp.com",
  projectId: "ganesapuram-1458a",
  storageBucket: "ganesapuram-1458a.appspot.com",
  messagingSenderId: "1014758642776",
  appId: "1:1014758642776:web:78d4d0c70fc0cf8766e62d",
  measurementId: "G-QP4Q709XGE"
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