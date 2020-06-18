import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzvLQIhFgZMI43EtcLyUcJjFRlBPmK5Pk",
  authDomain: "eventer-firebase.firebaseapp.com",
  databaseURL: "https://eventer-firebase.firebaseio.com",
  projectId: "eventer-firebase",
  storageBucket: "eventer-firebase.appspot.com",
  messagingSenderId: "672705384965",
  appId: "1:672705384965:web:3c9d2abf5107debf8f026c",
  measurementId: "G-XL2HF8Z67M",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
