import styles from './App.module.css';
import React from 'react';
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import ManagerViewRestaurant from './components/ManagerViewRestaurant'
import ManagerViewMain from './components/ManagerViewMain';
import RestaurantOrders from './components/RestaurantOrders'
import CustomerView from './components/CustomerView'
import CustomerViewRestaurant from './components/CustomerViewRestaurant'
import axios from 'axios';
import { BrowserRouter, Routes, Route} from 'react-router-dom'


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
      openMenu: null,
      users: [],
      publicRestaurants: []
    }
  }

  componentDidMount() {
    var token = localStorage.getItem( 'token26' )
    let payload = { token: token }
    axios.get('https://webproject26.herokuapp.com/restaurants')
    .then( res => this.setState( { publicRestaurants: res.data }))
    .catch( err => console.error(err))
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
      this.setUser(null)
    })
  }

  login = () => {
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

  getMenuItems = (restaurantId) => {
    axios.get(`https://webproject26.herokuapp.com/menu/${restaurantId}`)
    .then( (res) => {
      this.setState( { openMenu: res.data} )
    })
    .catch( (err) => {
      console.log( err )
      this.setState( { openMenu: []})
    })
  }

  render() {
  
    return (
      <BrowserRouter>
        <Header user = { this.state.user } login = { this.login } register = { this.register } logout = { this.logout }/>
        <Routes>
            <Route path = '/' element = { <div className = { styles.abc }><CustomerView restaurants = { this.state.publicRestaurants }/></div> } />
            <Route path = '/:restaurantId' element = { <div className = { styles.abc }><CustomerViewRestaurant /></div> } />
            <Route path = '/restaurants' element = { <div className = { styles.abc }><ManagerViewMain restaurants = { this.state.ownRestaurants }/></div> } />
            <Route path = '/restaurants/:restaurantId' element = { <div className = { styles.abc }><ManagerViewRestaurant /></div> } />
            <Route path = '/orders' element = { <div className = { styles.abc }><RestaurantOrders restaurants = { this.state.ownRestaurants }
                                                                                                  openMenu = { this.state.openMenu }
                                                                                                  getMenu = { this.getMenuItems }
                                                                                                  users = { this.state.users }/></div> } />
        </Routes>
        <div>
          <Login view = { this.state.logForm }
                 loginClick = { this.login }
                 regClick = { this.register }
                 setUser = { this.setUser }
                 setOwnRestaurants = { this.setOwnRestaurants }
                 setUsers = { this.setUsers } />
          <Register view = { this.state.regForm }
                    regClick = { this.register }
                    setUser = { this.setUser }
                    logClick = { this.login } />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
