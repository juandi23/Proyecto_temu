// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDW1Bq5uaaufwU2KyMrRq1xDQ4Obzm9PvA",
    authDomain: "temu-fb412.firebaseapp.com",
    projectId: "temu-fb412",
    storageBucket: "temu-fb412.firebasestorage.app",
    messagingSenderId: "908614083027",
    appId: "1:908614083027:web:fe5050807849b03b430f26",
    measurementId: "G-9SQ7B28NJD"
  
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Exporta la configuración de autenticación
export { auth, GoogleAuthProvider, signInWithPopup };
