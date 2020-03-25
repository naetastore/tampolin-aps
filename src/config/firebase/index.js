import firebase from 'firebase/app';
import 'firebase/database';

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3UpQ_WaIo0vEtMxohUP4ThI wUJUCR71M",
    authDomain: "simple-reactapp.firebaseapp.com",
    databaseURL: "https://simple-reactapp.firebaseio.com",
    projectId: "simple-reactapp",
    storageBucket: "simple-reactapp.appspot.com",
    messagingSenderId: "537295508902",
    appId: "1:537295508902:web:9677948640de3857fb2b67",
    measurementId: "G-23JTSZMGNR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the database service

export const database = firebase.database();

export default firebase;