import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyDMxKekgkwspS_AOv5lPUaZZfOVZ_lJRL0",
    authDomain: "building-map-b9015.firebaseapp.com",
    databaseURL: "https://building-map-b9015.firebaseio.com",
    projectId: "building-map-b9015",
    storageBucket: "building-map-b9015.appspot.com",
    messagingSenderId: "576854197180",
    appId: "1:576854197180:web:4e87e24d4a2c309940e1b9",
    measurementId: "G-10WL7E4CCW"
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();