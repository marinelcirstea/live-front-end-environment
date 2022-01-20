import { initializeApp, getApp, getApps, FirebaseApp, FirebaseOptions } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;

if (getApps().length) {
  app = getApp();
} else {
  app = initializeApp(firebaseConfig);
}

export const storage: FirebaseStorage = getStorage(app);

export default app;
