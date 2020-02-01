var firebaseConfig = {
    apiKey: "AIzaSyCw-Pr-seunUHBm1KvekvLnT0n-VgzDHcU",
    authDomain: "easymyprescription.firebaseapp.com",
    databaseURL: "https://easymyprescription.firebaseio.com",
    projectId: "easymyprescription",
    storageBucket: "easymyprescription.appspot.com",
    messagingSenderId: "315374369473",
    appId: "1:315374369473:web:d737b175f20198930fb240"
  };
  
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();