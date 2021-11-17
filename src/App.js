import styles from './App.module.css';
import React from 'react';
import Login from './components/Login'
import Register from './components/Register'
import ManagerViewRestaurant from './components/ManagerViewRestaurant'
import ManagerViewMain from './components/ManagerViewMain';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'


class App extends React.Component {
  constructor(props)
  {
    super(props)

    this.state = {
      logForm: false,
      regForm: false,
      user: null,
      isManager: false,
      ownRestaurants: []
    }
  }

  componentDidMount() {
    var token = localStorage.getItem( 'token26' )
    console.log( token )
    let payload = { token: token }
    axios.get('https://webproject26.herokuapp.com/login', { params: payload } )
    .then( ( res ) => {
      this.setUser( res.data )
      console.log( this.state.user )
      console.log( this.state.user.ismanager )
      if(this.state.user.ismanager) {
        axios.get('https://webproject26.herokuapp.com/restaurants', { params: { managerid: this.state.user.id } } )
        .then( ( res ) => {
          this.setOwnRestaurants(res.data)
        })
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
      <BrowserRouter>
      <>
      <div className = { styles.header }>
        <button onClick= { this.login }>login</button>
        <button onClick= { this.register }>register</button>
        <button onClick= { this.logout }>logout</button>
      </div>
      <Routes>
          <Route path = '/' element = { <Link to = '/restaurants'><button >sds</button></Link> } />
          <Route path = '/restaurants' element = { <div className= { styles.abc }><ManagerViewMain restaurants = { this.state.ownRestaurants } /></div> } />
          <Route path = '/restaurants/:id' element = { <div className= { styles.abc }><ManagerViewRestaurant /></div> } />
      </Routes>
      <div>
        <Login view = { this.state.logForm } loginClick = { this.login } regClick = { this.register } setUser = { this.setUser } setOwnRestaurants = { this.setOwnRestaurants }/>
        <Register view = { this.state.regForm } regClick = { this.register } logClick = { this.login }/>
      </div>
      </>
      </BrowserRouter>
    )
  }
}

export default App;
