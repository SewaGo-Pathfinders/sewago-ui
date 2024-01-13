import { initializeApp } from "firebase/app";
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDII_-Ct9mtKIIeSPTeZymWf1ev6vmJD_U",
  authDomain: "sewago-6b835.firebaseapp.com",
  projectId: "sewago-6b835",
  storageBucket: "sewago-6b835.appspot.com",
  messagingSenderId: "586074031971",
  appId: "1:586074031971:web:befbbe2c83bf49785db556",
  measurementId: "G-LB5JCRNDYQ"
};

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

export const productImg = ref(storage, 'product');
