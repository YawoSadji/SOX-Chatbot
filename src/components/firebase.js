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
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    toast.success(`Welcome, ${result.user.displayName}!`);
    return result.user;
  } catch (error) {
    toast.error("Login failed. Please try again.");
    console.error("Sign-in error:", error);
    return null;
  }
};

const signOutUser = async () => {
  try {
    toast.info("You have been logged out.");
    await signOut(auth);
  } catch (error) {
    toast.error("Log out failed. Please try again.");
    console.error("Log out error:", error);
  }
};

export { signInWithGoogle, signOutUser, auth };
