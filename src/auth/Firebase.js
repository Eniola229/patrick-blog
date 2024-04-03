
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, useAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";




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
export const messaging = getMessaging(app);

export const auth = getAuth(app);

export const generateToken = async () => {
  try {
    const messaging = getMessaging();
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === 'granted') {
      try {
        const token = await getToken(messaging, {
          vapidKey: "BBMUTmk-S-G-mr3yarwIVwS-rHzg-YrgOtnoIgFwIxUU5rtDDnEX2zh3IjgJ6gMBPU1mBSVR6njnMZn6kbPsyWk"
        });
        console.log(token);
      } catch (getTokenError) {
        console.error('Error while getting FCM token:', getTokenError);
        throw getTokenError;
      }
    }
  } catch (permissionError) {
    console.error('Error requesting notification permission:', permissionError);
    throw permissionError;
  }
}
