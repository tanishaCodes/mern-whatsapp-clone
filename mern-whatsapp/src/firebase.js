import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDYE3RQmp1iL8HM6w2lEnbKrgeKhqiTjNY",
    authDomain: "whatsapp-mern-4a083.firebaseapp.com",
    databaseURL: "https://whatsapp-mern-4a083.firebaseio.com",
    projectId: "whatsapp-mern-4a083",
    storageBucket: "whatsapp-mern-4a083.appspot.com",
    messagingSenderId: "675147022397",
    appId: "1:675147022397:web:af0fb1b46a894c47792a54"
  };

const firebaseApp = firebase.initializeApp (firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;