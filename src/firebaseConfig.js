import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyD8SxDrvYNtCQ7wS_KEqRXdktqaeZM3igI',
  authDomain: 'retail-pos-mvp.firebaseapp.com',
  projectId: 'retail-pos-mvp',
  storageBucket: 'retail-pos-mvp.firebasestorage.app',
  messagingSenderId: '840651621617',
  appId: '1:840651621617:web:064ab5e694b4d3073c5550',
  measurementId: 'G-SYJQ9WEYLX',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
export const app = firebaseApp;

googleProvider.setCustomParameters({
  prompt: 'select_account',
});
