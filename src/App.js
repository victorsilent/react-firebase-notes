import React, { Component } from 'react';
import './App.css';
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



class App extends Component {
  constructor(){
    super();
    this.state = {
      user: "",
      note: "",
      noteList: [],
    }
  }

  handleNote = (event) => {
    this.setState({note: event.target.value});
  }

  loginUser = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      let user = result.user;
      this.setState({user: user});
      firebase.database().ref('users/' + user.uid).update({
        username: user.displayName,
      });

    }).catch(function(error) {
      let errorMessage = error.message;
      console.log(errorMessage);
    });
  }
  addNote = value => {
    const noteRef = firebase.database().ref('notes/' + this.state.user.uid);
    noteRef.push({
      note: this.state.note
    });
    this.setState({note: ""});
  }
  renderAddNote = () => (
    <div>
      <input value={this.state.note} onChange={this.handleNote}type="text" placeholder="Insira a nota"></input>
      <button onClick = {this.addNote}>Adicionar Nota!</button>
      <br/>
      {this.myTodoList()}
    </div>
    
  )

  myTodoList = () => {
    let items = []
    firebase.database().ref('/notes/' + this.state.user.uid).once('value').then((snapshot) => {
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        items.push(item);
      });
      this.setState({
        noteList: items
      });
    });
  }
  render() {
    let loginButton = <button onClick={this.loginUser}>Login!</button>;
    return (
      <div className="App">
        <h1>{this.state.note}</h1>
        <h1>{this.state.user === "" ? "Olá! Faça seu login!" : `Ola, ${this.state.user.displayName} como vai?`}</h1>
        {this.state.user === "" ? loginButton : this.renderAddNote()}
        <ul>
          {this.state.noteList.map((note, index) => (
            <li key={index}> {note.note}</li>
          ))}
        </ul>
        
      </div>
    );
  }
}

export default App;
