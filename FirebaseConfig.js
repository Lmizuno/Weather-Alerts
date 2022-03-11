import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDjOzG3XflNqUFQ1k4hHyVvO-HTMasFy5M",
    authDomain: "weather-alerts-bcc6d.firebaseapp.com",
    projectId: "weather-alerts-bcc6d",
    storageBucket: "weather-alerts-bcc6d.appspot.com",
    messagingSenderId: "638505031728",
    appId: "1:638505031728:web:211a5f90b52264a309b5f5"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
