// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const signInWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    toast.success(`Welcome, ${result.user.displayName}!`);
    return result.user;
  } catch (error) {
    console.error("Sign-in error:", error);
    return null;
  }
};

const signOutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Log out error:", error);
  }
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
