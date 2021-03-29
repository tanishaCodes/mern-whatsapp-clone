import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-A7ogil2lkK2N7f-rCy7HvgCq8oGwqSE",
  authDomain: "whatsapp-clone-16d88.firebaseapp.com",
  projectId: "whatsapp-clone-16d88",
  storageBucket: "whatsapp-clone-16d88.appspot.com",
  messagingSenderId: "459550032815",
  appId: "1:459550032815:web:625b1f22209078fa79e55a",
  measurementId: "G-L5L068RBYX"
};

const firebaseApp = firebase.initializeApp (firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;