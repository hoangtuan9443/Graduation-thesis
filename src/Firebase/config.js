import { initializeApp } from "firebase/app";
import { get, getDatabase, onValue, ref, remove, set, query, limitToFirst } from "firebase/database"

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const dbRef = ref(database)


const putData = (link, data) => set(ref(database, link), data)
const removeData = (link, success = () => {}) => remove(ref(database, link)).then(success).catch(err => console.log(err))
const getValueAuto = (link, fc, cancelfc) => onValue(ref(database, link), fc, cancelfc)

export {database, dbRef, putData, removeData, getValueAuto}