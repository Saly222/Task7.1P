import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB52FOWyNx-thDZBCiyLYKDqM2Rzh6stHg",
    authDomain: "deakin-web-app-da450.firebaseapp.com",
    projectId: "deakin-web-app-da450",
    storageBucket: "deakin-web-app-da450.appspot.com",
    messagingSenderId: "594173341594",
    appId: "1:594173341594:web:3473e5b42cb36519ca5423"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth.email) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('Error in creating user document:', error.message);
        }

        return userDocRef;
    }
};

export const createAuthUserWithEmailAndPasswordWrapper = async (email, password) => {
    if (!email || !password) return;
    
    return await firebaseCreateUserWithEmailAndPassword(auth, email, password);
};

export const signinAuthUserWithEmailAndPassword= async (email, password) => {
    if (!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
};
