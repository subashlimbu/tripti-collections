import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDyO8C-Z11k5dNeVEi6iXjmrZRiFTVT-RM",
  authDomain: "tripti-db.firebaseapp.com",
  databaseURL: "https://tripti-db.firebaseio.com",
  projectId: "tripti-db",
  storageBucket: "tripti-db.appspot.com",
  messagingSenderId: "5644471017",
  appId: "1:5644471017:web:a6e002c56d2f457787be78",
  measurementId: "G-KC4D32Y2XT",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
