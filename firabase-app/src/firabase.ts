import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCx3JYiDbKha7xZxwzS-rDTwjNBKacUjU0",
        authDomain: "curso-firabase-3f143.firebaseapp.com",
        projectId: "curso-firabase-3f143",
        storageBucket: "curso-firabase-3f143.firebasestorage.app",
        messagingSenderId: "44597006070",
        appId: "1:44597006070:web:c92e6944c6a9078ea626d7",
        measurementId: "G-YWBQWHVMNE"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export {db};