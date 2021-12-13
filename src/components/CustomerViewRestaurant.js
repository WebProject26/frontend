import React, { useEffect, useState } from 'react';
import styles from './CustomerViewRestaurant.module.css'
import CustomerRestaurantInfo from './CustomerRestaurantInfo'
import CustomerViewCategory from './CustomerViewCategory'
import CustomerOrders from './CustomerOrders';
import Cart from './Cart';
import { useParams } from 'react-router';
import axios from 'axios'

function CustomerViewRestaurant() {

    let { restaurantId } = useParams()
  
    const [ openRestaurant, setOpenRestaurant ] = useState(null) //current restaurant
    const [ menuItems, setMenuItems ] = useState([]) //current menu
    const [ cartItemsIds, setCartItemsIds ] = useState([]) //cart items of the user
    const [ updateInfo, setUpdateInfo ] = useState(false) //Changing this value in the subcomponents triggers the useEffect
    const [ loginMessage, setLoginMessage ] = useState(true)

    useEffect(() => {
        //get the current restaurant info
        axios.get(`https://webproject26.herokuapp.com/restaurants/${restaurantId}`)
        .then( res => {
            console.log('restraurant ')
            setOpenRestaurant(res.data)
        })
        .catch( err => {
            console.error( err )
            console.log('restaurant err')
        })
        //get the current restaurant menu
        axios.get(`https://webproject26.herokuapp.com/menu/${restaurantId}`)
        .then( (res) => {
            setMenuItems(res.data)
            console.log( 'menu')
        })
        .catch( (err) => {
            console.log( err )
            console.log( 'menu err')
        })
        //get the cart items of the user
        axios.get('https://webproject26.herokuapp.com/cart', { params: { token : localStorage.getItem('token26')}})
        .then(res => {
            setCartItemsIds( res.data.cartitems ? res.data.cartitems : [])
            setLoginMessage(false)
        })
        .catch( err => console.log( err))
        setUpdateInfo(false)
    }, [restaurantId, updateInfo])

    let uniqueCategories = []
    let categories = menuItems.map( item => item.foodcategory )
    let uniqueEntries = (value, index, self) => {
        return self.indexOf(value) === index
    }
    let filteredCategories = categories.filter(uniqueEntries)
    uniqueCategories = filteredCategories

    const [ordersView, setOrdersView ] = useState(false)
    const [ordersX, setOrdersX ] = useState('100%')
    const [ordersButtonX, setOrdersButtonX ] = useState('0%')
    
    const showOrders = () => {
        setOrdersView(true)
        setOrdersButtonX('100%')
        setTimeout(() => {
            setOrdersX('0%')
        }, 520)
    }

    return (
        <div className = { styles.container }>
            <div className = { styles.innerContainer }>
            <div className = { styles.testImg } style = { { backgroundImage: openRestaurant? `url(${openRestaurant.imageURL})` : ''}}></div>
            <CustomerRestaurantInfo openRestaurant = { openRestaurant }/>
            { uniqueCategories.map((category, index) => <CustomerViewCategory key = {index} name = { category } items = { menuItems.filter(item => item.foodcategory === category) } updateInfo = { setCartItemsIds }/>) }
            </div>
            <div className = { styles.cartContainer}>
            <Cart menuItems = {menuItems} cartItemsIds = { cartItemsIds } restaurant = { openRestaurant } updateInfo = { setCartItemsIds } loginMessage = { loginMessage } />
            </div>
            <button className = {styles.showOrders} style = { {transform: `translateX(${ordersButtonX})`}} onClick = { showOrders }>My orders</button>
            <div className = { styles.orders } style = { {transform: `translateX(${ordersX})`} } >
            <CustomerOrders setOrdersX = { setOrdersX }
                            setOrdersButtonX = { setOrdersButtonX }
                            ordersView = { ordersView }
                            setOrdersView = { setOrdersView }
                            menuItems = { menuItems }
                            openRestaurant = { openRestaurant }/>
            </div>
        </div>
    )
}

export default CustomerViewRestaurant
