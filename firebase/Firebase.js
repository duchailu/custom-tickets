// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBER9c1-QzzrW7nQnolxr4oLDgU_htPL_g',
  authDomain: 'real-time-ticket-management.firebaseapp.com',
  databaseURL: 'https://real-time-ticket-management-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'real-time-ticket-management',
  storageBucket: 'real-time-ticket-management.appspot.com',
  messagingSenderId: '779004161259',
  appId: '1:779004161259:web:422246a21218fbf29562ae',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app)
