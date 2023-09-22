import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCENKuGTVts4JZwflaz7SZw1UPYtJ5Cxd8",
  authDomain: "movie-4f0da.firebaseapp.com",
  databaseURL: "https://movie-4f0da-default-rtdb.firebaseio.com",
  projectId: "movie-4f0da",
  storageBucket: "movie-4f0da.appspot.com",
  messagingSenderId: "917645092140",
  appId: "1:917645092140:web:c7cf66d199d7fc90033889",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
