// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCENKuGTVts4JZwflaz7SZw1UPYtJ5Cxd8",
  authDomain: "movie-4f0da.firebaseapp.com",
  projectId: "movie-4f0da",
  storageBucket: "movie-4f0da.appspot.com",
  messagingSenderId: "917645092140",
  appId: "1:917645092140:web:c7cf66d199d7fc90033889",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
