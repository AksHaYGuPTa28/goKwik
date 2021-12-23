import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyCQkC6j6i4Ci4WcsxMGCntzVYwgsBi47sY",
  authDomain: "gokwik-a8478.firebaseapp.com",
  projectId: "gokwik-a8478",
  storageBucket: "gokwik-a8478.appspot.com",
  messagingSenderId: "9394332107",
  appId: "1:9394332107:web:aed18ea690fe34baac564e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { auth };
export default db;