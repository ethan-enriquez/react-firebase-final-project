import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR DOMAIN",
  projectId: "YOUR_ID",//replaced before exporting for security
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);