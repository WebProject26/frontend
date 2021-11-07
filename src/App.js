//import styles from './App.module.css';
//import axios from './axios';
import React from 'react';
import Login from './components/Login'
import Register from './components/Register'




class App extends React.Component {
  constructor(props)
  {
    super(props)

    this.state = {
      logForm: false,
      regForm: false
    }
  }

  login = () => {
    this.setState({ logForm: this.state.logForm? false: true })
    this.setState({ regForm: false})
  }

  register = () => {
    this.setState({ regForm: this.state.regForm? false: true })
    this.setState({ logForm: false})
  }

  render() {
    return (
      <div>
        <Login view = {this.state.logForm} loginClick = {this.login} regClick = {this.register}/>
        <Register view = {this.state.regForm} regClick = {this.register} logClick = {this.login}/>
        <button onClick={this.login}>login</button>
        <button onClick={this.register}>register</button>
      </div>
    )
  }
}

export default App;
