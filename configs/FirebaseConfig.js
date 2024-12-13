import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD9CE2XBuU81oU7iRPxT0WAPjPnD9W0ciw",
  authDomain: "businessapp-3006d.firebaseapp.com",
  projectId: "businessapp-3006d",
  storageBucket: "businessapp-3006d.appspot.com",
  messagingSenderId: "851359394004",
  appId: "1:851359394004:web:b42ec1950bc9370603b341",
  measurementId: "G-PV4P9249GH",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// async function testFirestore() {
//   try {
//     const querySnapshot = await getDocs(collection(db, "Slider"));
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, "=>", doc.data());
//     });
//   } catch (error) {
//     console.error("Error connecting to Firestore:", error);
//   }
// }

// testFirestore();
