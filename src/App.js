import styles from './App.module.css';
import React from 'react';
import Login from './components/Login'
import Register from './components/Register'
import ManagerViewRestaurant from './components/ManagerViewRestaurant'
import ManagerViewMain from './components/ManagerViewMain';
import RestaurantOrders from './components/RestaurantOrders'
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
      ownRestaurants: [],
      openRestaurant: null,
      openMenu: null,
      users: []
    }
  }

  componentDidMount() {
    var token = localStorage.getItem( 'token26' )
    let payload = { token: token }
    axios.get('https://webproject26.herokuapp.com/login', { params: payload } )
    .then( ( res ) => {
      this.setUser( res.data )
      console.log('userSet')
      if(this.state.user.ismanager) {
        let payload = { managerid : this.state.user.id }
        axios.get('https://webproject26.herokuapp.com/restaurants', { headers : payload } )
        .then( ( res ) => {
          this.setOwnRestaurants(res.data)
          console.log('restSet')
        })
        .catch( err => console.log( err ) )
        axios.get('https://webproject26.herokuapp.com/register')
        .then( res => {
          this.setUsers( res.data )
        })
        .catch( err => console.log( err ) )
      }
    })
    .catch(( error ) => {
      console.log( error )
      this.login()
    })
  }

  login = (event) => {
    this.setState({ logForm: !this.state.logForm })
    this.setState({ regForm: false })
  }

  setUsers = (usersArray) => {
    this.setState({ users: usersArray })
  }

  register = () => {
    this.setState({ regForm: !this.state.regForm })
    this.setState({ logForm: false })
  }

  logout = () => {
    localStorage.removeItem('token26');
    window.location.reload()
  }

  setUser = (userObject) => {
    this.setState({ user: userObject })
  }

  setOwnRestaurants = ( restaurantsArray ) => {
    this.setState({ ownRestaurants: restaurantsArray })
  }

  setOpenRestaurant = (restaurantId) => {
    axios.get(`https://webproject26.herokuapp.com/restaurants/${restaurantId}`)
    .then( res => {
      this.setState({ openRestaurant: res.data })
    })
    .catch( err => console.error( err ) )
  }


  getMenuItems = (restaurantId) => {
    axios.get(`https://webproject26.herokuapp.com/menu/${restaurantId}`)
    .then( (res) => {
      this.setState( { openMenu: res.data} )
    })
    .catch( (err) => {
      console.log( err )
      this.setState( { openMenu: ['error']})
    })
  }



  render() {
  
    return (
      <BrowserRouter>
      <>
      <div className = { styles.header }>
        <button onClick= { this.login }>login</button>
        <button onClick= { this.register }>register</button>
        <button onClick= { this.logout }>logout</button>
        <Link to = '/'><button >Front page</button></Link>
        <Link to = '/restaurants'><button >Restaurant manager</button></Link>
        <Link to = '/orders'><button >Orders manager</button></Link>
      </div>
      <Routes>
          <Route path = '/' element = { <div className = { styles.abc }><div>All restaurants will be visible here </div></div> } />
          <Route path = '/restaurants' element = { <div className = { styles.abc }><ManagerViewMain restaurants = { this.state.ownRestaurants }/></div> } />
          <Route path = '/restaurants/:restaurantId' element = { <div className = { styles.abc }><ManagerViewRestaurant openMenu = { this.state.openMenu } getMenu = { this.getMenuItems } setOpenRestaurant = { this.setOpenRestaurant } openRestaurant = { this.state.openRestaurant }/></div> } />
          <Route path = '/orders' element = { <div className = { styles.abc }><RestaurantOrders restaurants = { this.state.ownRestaurants }  openMenu = { this.state.openMenu } getMenu = { this.getMenuItems } users = { this.state.users }/></div> }/>
      </Routes>
      <div>
        <Login view = { this.state.logForm } loginClick = { this.login } regClick = { this.register } setUser = { this.setUser } setOwnRestaurants = { this.setOwnRestaurants } setUsers = { this.setUsers }/>
        <Register view = { this.state.regForm } regClick = { this.register } setUser = { this.setUser } logClick = { this.login }/>
      </div>
      </>
      </BrowserRouter>
    )
  }
}

export default App;
