// Firebase settings for the website's sign-in. These aren't secret: they're meant to be
// visible in a website's code. firestore.rules is what keeps each person's data private.
// Set this to null to run the website without accounts.
window.PACED_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDxT_NKfHnnt1tUaoDf2_1R_EoPwnOubgY',
  authDomain: 'paced-5dbc5.firebaseapp.com',
  projectId: 'paced-5dbc5',
  storageBucket: 'paced-5dbc5.firebasestorage.app',
  messagingSenderId: '1053581199692',
  appId: '1:1053581199692:web:21943f71a3407e8ec2a7e9'
};

// Google's client ID for importing from Google Tasks. This isn't secret either.
// Set this to null to hide the import.
window.PACED_GOOGLE_CLIENT_ID = '1053581199692-n3i9mm3uvin0ciqfdse1bnfkuuj4rmb4.apps.googleusercontent.com';
