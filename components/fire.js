import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyAn6Wcwvle2AT_OP8f3Djjwo3J1GFvT5Pw",
  authDomain: "treehacks-12978.firebaseapp.com",
  databaseURL: "https://treehacks-12978.firebaseio.com",
  projectId: "treehacks-12978",
  storageBucket: "treehacks-12978.appspot.com",
  messagingSenderId: "211163918385"
};
var fire = firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const auth = firebase.auth();
export default fire;
