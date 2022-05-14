import { initializeApp } from "firebase/app";

import { getFirestore} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBobrRHotZSCT8soMBA4stDtkJHyAa718w",
    authDomain: "tic-tac-t-82ae9.firebaseapp.com",
    projectId: "tic-tac-t-82ae9",
    storageBucket: "tic-tac-t-82ae9.appspot.com",
    messagingSenderId: "483196945899",
    appId: "1:483196945899:web:ef731355e475f6e55305ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
