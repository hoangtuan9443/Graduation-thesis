// Import the functions you need from the SDKs you need
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref } from "firebase/database"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "graduation-thesis-database.firebaseapp.com",
  databaseURL: "https://graduation-thesis-database-default-rtdb.firebaseio.com",
  projectId: "graduation-thesis-database",
  storageBucket: "graduation-thesis-database.appspot.com",
  messagingSenderId: "415236942513",
  appId: "1:415236942513:web:fd39bea6525b615fb59090",
  measurementId: "G-86GWR8LGD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth()

const FirebaseContext = createContext(null)

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    } 

    const putData = (key, data) => set(ref(database, key), data)

    return (
        <FirebaseContext.Provider
            value={{ signupUserWithEmailAndPassword, putData }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}