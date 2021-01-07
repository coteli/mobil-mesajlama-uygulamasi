//Firebase ayarlarının bulunduğu bileşendir.

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAw0S_eSiC1MEqAVlpKh4NauX_Sq0owXVQ",
  authDomain: "wtmu-a6f69.firebaseapp.com",
  databaseURL: "https://wtmu-a6f69.firebaseio.com",
  projectId: "wtmu-a6f69",
  storageBucket: "wtmu-a6f69.appspot.com",
  messagingSenderId: "452804808537",
  appId: "1:452804808537:web:c4cc98aa08ed81f3eb0648",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const vt = firebaseApp.firestore();
const yetki = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { yetki, provider };
export default vt;
