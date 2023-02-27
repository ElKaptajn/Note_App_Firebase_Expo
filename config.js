import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBXZBIWKS7CH14Uq-Y7VSJKbORTE3JK8AU",
  authDomain: "note-project---rn.firebaseapp.com",
  projectId: "note-project---rn",
  storageBucket: "note-project---rn.appspot.com",
  messagingSenderId: "1010295419685",
  appId: "1:1010295419685:web:f50bf3ab46171a9fe360cc",
  measurementId: "G-399M5HYXKC"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
