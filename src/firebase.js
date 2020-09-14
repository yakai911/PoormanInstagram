import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCINQniQTW7aduLTvp2J2DyApCRMeR9q_s",
  authDomain: "instagram-a.firebaseapp.com",
  databaseURL: "https://instagram-a.firebaseio.com",
  projectId: "instagram-a",
  storageBucket: "instagram-a.appspot.com",
  messagingSenderId: "56324156613",
  appId: "1:56324156613:web:6e31477e38b4d4c34954ac",
  measurementId: "G-2VCZCXFYCG",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
