
// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "firebase/app";
// Add the Firebase products that you want to use
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOc0HSrJMJlLRRk7k-55RTwxrb-EMW58U",
    authDomain: "og-meta-image-test.firebaseapp.com",
    projectId: "og-meta-image-test",
    storageBucket: "og-meta-image-test.appspot.com",
    messagingSenderId: "546691663473",
    appId: "1:546691663473:web:17224de62c96ba337bfdd0",
    measurementId: "G-KNZNT5FC4D"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
