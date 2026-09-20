import { initializeApp } from 'firebase/app';

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
