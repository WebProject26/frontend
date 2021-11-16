import styles from './App.module.css';
import React from 'react';
import Login from './components/Login'
import Register from './components/Register'
import ManagerViewRestaurant from './components/ManagerViewRestaurant'
import ManagerViewMain from './components/ManagerViewMain';
import axios from 'axios';


class App extends React.Component {
  constructor(props)
  {
    super(props)

    this.state = {
      logForm: false,
      regForm: false,
      user: null,
      ownRestaurants: []
    }
  }

  componentDidMount() {
    var token = localStorage.getItem( 'token26' )
    let payload = { token: token }
    axios.get('https://webproject26.herokuapp.com/login', { params: payload } )
    .then( ( res ) => {
      this.setUser( res.data )
      console.log( this.state.user )
      console.log( this.state.user.ismanager )
      if(this.state.user.ismanager) {
        axios.get('https://webproject26.herokuapp.com/restaurants', { params: { managerid: this.state.user.id } } )
        .then( res => this.setOwnRestaurants(res.data) )
        .catch( err => console.log( err ) )
      }
    })
    .catch(( error ) => {
      console.log( error )
      this.login()
    })
  }

  login = () => {
    this.setState({ logForm: this.state.logForm? false: true })
    this.setState({ regForm: false })
  }

  register = () => {
    this.setState({ regForm: this.state.regForm? false: true })
    this.setState({ logForm: false })
  }

  logout = () => {
    localStorage.removeItem('token26');
    window.location.reload()
  }

  setUser = (userObject) => {
    this.setState({ user: userObject })
  }

  setOwnRestaurants = (restaurantsArray) => {
    this.setState({ ownRestaurants: restaurantsArray })
  }

  render() {

    return (
      <>
      <div className = { styles.header }>
        <button onClick= { this.login }>login</button>
        <button onClick= { this.register }>register</button>
        <button onClick= { this.logout }>logout</button>
      </div>
      <div className= { styles.abc }>
        <Login view = { this.state.logForm } loginClick = { this.login } regClick = { this.register } setUser = { this.setUser } />
        <Register view = { this.state.regForm } regClick = { this.register } logClick = { this.login }/>
        <ManagerViewRestaurant />
        <ManagerViewMain restaurants = { this.state.ownRestaurants } /> 
      </div>
      </>
    )
  }
}

export default App;
