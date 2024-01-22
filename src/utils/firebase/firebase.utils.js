// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB8omq6JBOm_Zk8Qceo2h9wUvvp5Gi_jsw',
    authDomain: 'crwn-clothing-db-ba87b.firebaseapp.com',
    projectId: 'crwn-clothing-db-ba87b',
    storageBucket: 'crwn-clothing-db-ba87b.appspot.com',
    messagingSenderId: '249920824237',
    appId: '1:249920824237:web:0c7d84dcef05dae103f724',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// the DB instance allows us to tell the firebase when we want to get a document or
// we want to set the document related to the databse
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(44, userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(48, userSnapshot);
    console.log(49, userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error) {
            console.log('Error while creating the user', error.message);
        }
    }
    return userDocRef;
};
