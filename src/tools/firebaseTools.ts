import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAEbNPX53YErforHjUgPn454AowpTR6DZs",
  authDomain: "mywebsite-3f527.firebaseapp.com",
  databaseURL: "https://mywebsite-3f527-default-rtdb.firebaseio.com",
  projectId: "mywebsite-3f527",
  storageBucket: "mywebsite-3f527.appspot.com",
  messagingSenderId: "892710684597",
  appId: "1:892710684597:web:7868026be3db84fc333bfc",
  measurementId: "G-NJHF3T1M43",
};

export const firebaseApp = initializeApp(firebaseConfig);
