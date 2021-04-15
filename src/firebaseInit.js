import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyB3XMcQCiBQrmYZDr2APovI-8_UTXHt2s8",
  authDomain: "contacts-book-ac49a.firebaseapp.com",
  databaseURL: "https://contacts-book-ac49a-default-rtdb.firebaseio.com",
  projectId: "contacts-book-ac49a",
  storageBucket: "contacts-book-ac49a.appspot.com",
  messagingSenderId: "575102200029",
  appId: "1:575102200029:web:5c39274c600a22dcccd334",
});

const db = firebase.firestore();

export {db};
