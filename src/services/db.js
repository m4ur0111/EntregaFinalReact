// Importa las funciones necesarias de los SDK que necesites
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyQOzu9x3LqwGO-d6Ua7JbOFEl26r7SxI",
    authDomain: "react-proyect-89926.firebaseapp.com",
    projectId: "react-proyect-89926",
    storageBucket: "react-proyect-89926.appspot.com",
    messagingSenderId: "237201998767",
    appId: "1:237201998767:web:68b5d88de3a2c20ae2a55a"
};

// Inicializa Firebase
initializeApp(firebaseConfig);

// Exporta la instancia de Firestore
export const db = getFirestore();