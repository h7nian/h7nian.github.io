// Firebase Configuration
// Using Firebase Compat version for better browser compatibility

const firebaseConfig = {
    apiKey: "AIzaSyAiDj7vzBtvSZrVRXpeF8MEUWWmyZfkl0c",
    authDomain: "my-personal-website-e11ab.firebaseapp.com",
    databaseURL: "https://my-personal-website-e11ab-default-rtdb.firebaseio.com",
    projectId: "my-personal-website-e11ab",
    storageBucket: "my-personal-website-e11ab.firebasestorage.app",
    messagingSenderId: "427992184527",
    appId: "1:427992184527:web:f6e2520af31a926a3ae9ba",
    measurementId: "G-9B1DWV5N9N"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully');
    console.log('🔥 Database URL:', firebaseConfig.databaseURL);
} catch (error) {
    console.error('❌ Firebase initialization error:', error);
}
