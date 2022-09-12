import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCEHEgYW-1uGtRNwkyqUzv4IryCpcVP9oQ",
    authDomain: "instagram-clone-curso-baff7.firebaseapp.com",
    projectId: "instagram-clone-curso-baff7",
    storageBucket: "instagram-clone-curso-baff7.appspot.com",
    messagingSenderId: "34140672940",
    appId: "1:34140672940:web:1a47d31165ba4155fc6009",
    measurementId: "G-J1QC8F4PXB"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};





