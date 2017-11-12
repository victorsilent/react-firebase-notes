import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyD7kzni4vibnC1k3syUEpNa0DnCuLkeAuY",
  authDomain: "login-note.firebaseapp.com",
  databaseURL: "https://login-note.firebaseio.com",
  projectId: "login-note",
  storageBucket: "login-note.appspot.com",
  messagingSenderId: "220195332405"
};

firebase.initializeApp(config);

class APIConnection {
  loginUser = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      firebase.database().ref('users/' + result.user.uid).update({
        username: result.user.displayName,
      });
    }).catch(function(error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }
  

}

export default new APIConnection();