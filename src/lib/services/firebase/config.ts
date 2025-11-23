import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { FirebaseApp, FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';

export const REQUIRED_FIREBASE_ENV_VARS = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
] as const;

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const getMissingEnvVars = () => REQUIRED_FIREBASE_ENV_VARS.filter(key => !process.env[key]);

let firebaseApp: FirebaseApp | null = null;

const ensureFirebaseApp = (): FirebaseApp => {
  if (firebaseApp) {
    return firebaseApp;
  }

  if (!getApps().length) {
    const missing = getMissingEnvVars();
    if (missing.length > 0) {
      throw new Error(
        `Firebase environment variables are missing: ${missing.join(
          ', '
        )}. Please populate them in your environment.`
      );
    }

    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }

  return firebaseApp;
};

export const getFirebaseApp = (): FirebaseApp => ensureFirebaseApp();
export const getFirebaseAuth = () => getAuth(ensureFirebaseApp());
export const getFirebaseFirestore = () => getFirestore(ensureFirebaseApp());
export const getFirebaseStorage = () => getStorage(ensureFirebaseApp());

export const getMissingFirebaseEnvVars = () => getMissingEnvVars();
export const isFirebaseConfigured = () => getMissingEnvVars().length === 0;
