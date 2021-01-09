//Firebase ayarlarının bulunduğu bileşendir.

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBT8oLdiStQQhcGLV9wZvPfXbfmE74VneE",
  authDomain: "momu-89607.firebaseapp.com",
  projectId: "momu-89607",
  storageBucket: "momu-89607.appspot.com",
  messagingSenderId: "642727128090",
  appId: "1:642727128090:web:18c65b0827f210a4d975a3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const vt = firebaseApp.firestore();
const yetki = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { yetki, provider };
export default vt;
