import React, { Component } from 'react';
import './App.css';
import APIConnection from './api/APIConnection.js'

// const config = {
//     apiKey: "AIzaSyD7kzni4vibnC1k3syUEpNa0DnCuLkeAuY",
//     authDomain: "login-note.firebaseapp.com",
//     databaseURL: "https://login-note.firebaseio.com",
//     projectId: "login-note",
//     storageBucket: "login-note.appspot.com",
//     messagingSenderId: "220195332405"
//   };

// firebase.initializeApp(config);
class App extends Component {
  constructor(){
    super();
    this.state = {
      user: undefined,
      note: "",
      noteList: [],
    }
  }
  // componentWillMount() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     this.setState({user: user});
  //   });
  // }
  handleNote = (event) => {
    this.setState({note: event.target.value});
  }

  loginUser = () =>{
   APIConnection.loginUser(this.setState);
    // APIConnection.teste();
  }
  // addNote = value => {
  //   const noteRef = firebase.database().ref('notes/' + this.state.user.uid);
  //   noteRef.push({
  //     note: this.state.note
  //   });
  //   this.setState({note: ""});
  // }

  renderAddNote = () => (
    <div>
      <input value={this.state.note} onChange={this.handleNote}type="text" placeholder="Insira a nota"></input>
      <button onClick = {this.addNote}>Adicionar Nota!</button>
      <br/>
      {this.myTodoList()}
    </div>
    
  )

  // myTodoList = () => {
  //   const items = []
  //   firebase.database().ref('/notes/' + this.state.user.uid).once('value').then((snapshot) => {
  //     snapshot.forEach(function(childSnapshot) {
  //       const item = childSnapshot.val();
  //       item['.key'] = childSnapshot.key;
  //       items.push(item);
  //     });
  //     this.setState({
  //       noteList: items
  //     });
  //   });
  // }
  render() {
    const loginButton = <button onClick={this.loginUser}>Login!</button>;
    return (
      <div className="App">
        <h1>{this.state.note}</h1>
        <h1>{this.state.user === undefined ? "Olá! Faça seu logins!" : `Ola, ${this.state.user.displayName} como vai?`}</h1>
        {this.state.user === undefined ? loginButton : this.renderAddNote()}
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
