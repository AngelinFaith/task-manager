// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJWcS-R5mC9ODy83cU22u1YKUZb7fyiNs",
  authDomain: "task-manager-9e5b5.firebaseapp.com",
  databaseURL: "https://task-manager-9e5b5-default-rtdb.firebaseio.com",
  projectId: "task-manager-9e5b5",
  storageBucket: "task-manager-9e5b5.appspot.com",
  messagingSenderId: "898549036258",
  appId: "1:898549036258:web:473b095357d52dcda65abb",
  measurementId: "G-5SQCNPQR1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// We don't need analyrics thus we comment out it and declare getFireStore.  
const db = getFirestore(app); 

//export default db;
export {db};