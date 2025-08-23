import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

function StartFirebase() {
    const firebaseConfig = {
    apiKey: "AIzaSyAbc32fHGgV1mgQwRwoY0Uis_EaQz-1sw4",
    authDomain: "petty-cash-80051.firebaseapp.com",
    projectId: "petty-cash-80051",
    storageBucket: "petty-cash-80051.firebasestorage.app",
    messagingSenderId: "1026887640217",
    appId: "1:1026887640217:web:44b90cb9b7c783ae1e4408"
    };

    const app = initializeApp(firebaseConfig);
    return getDatabase(app);
}

export default StartFirebase;
