import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAg5Ba7JYSNr2UUgB-L2IXV5MDImxlc7C8",
  authDomain: "weshare-8c94c.firebaseapp.com",
  projectId: "weshare-8c94c",
  storageBucket: "weshare-8c94c.appspot.com",
  messagingSenderId: "385608702235",
  appId: "1:385608702235:web:80a9facf6902be0fd9dbbe",
  measurementId: "G-BE0H84862S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;
