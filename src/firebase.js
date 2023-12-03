import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDICkNlS_ho8ybJm7gaqFBRP3PVUCUNiRU",
    authDomain: "netflixclone-6fdea.firebaseapp.com",
    projectId: "netflixclone-6fdea",
    storageBucket: "netflixclone-6fdea.appspot.com",
    messagingSenderId: "243956141526",
    appId: "1:243956141526:web:422a1ef5d37bc739a32877"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
export default db;