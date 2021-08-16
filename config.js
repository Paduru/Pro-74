import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCpZrmnFomXiFAL94oq7KX9RztfzSDUPWk",
  authDomain: "story-hub-3290d.firebaseapp.com",
  projectId: "story-hub-3290d",
  storageBucket: "story-hub-3290d.appspot.com",
  messagingSenderId: "677134782863",
  appId: "1:677134782863:web:25869585ccf7dcebf1bbfa",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
