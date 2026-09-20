import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseApp } from '../firebaseConfig';

export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

googleProvider.setCustomParameters({
  prompt: 'select_account',
});
