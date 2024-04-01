
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, useAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAIdV1tZy8e9Gssl5mHjnJAoA9YURWeJio",
  authDomain: "blog-ece4b.firebaseapp.com",
  projectId: "blog-ece4b",
  storageBucket: "blog-ece4b.appspot.com",
  messagingSenderId: "669829313396",
  appId: "1:669829313396:web:27d7be22ede09705b97221"
};


const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export { provider };

export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = getAuth(app);