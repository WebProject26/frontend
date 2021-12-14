import React, { useEffect, useState } from 'react';
import styles from './RestaurantOrders.module.css'
import Order from './Order'
import axios from 'axios'

function RestaurantOrders({ restaurants, openMenu, getMenu, users }) {

    const [ orders, setOrders ] = useState([])
    const [ restaurantId, setRestaurantId ] = useState( restaurants[0] ? restaurants[0].id : 0)
    const [ updating, setUpdating ] = useState(false)

    const selectRestaurant = (id) => {
        getMenu(id)
        setRestaurantId(id)
    }

    let receivedOrders = orders.filter( order => order.status === 0 )
    let acceptedOrders = orders.filter( order => order.status === 1 )
    let deliveryOrders = orders.filter( order => order.status === 2 )
    let closedOrders = orders.filter( order => order.status === 3 )

    useEffect(() => {
            let token = localStorage.getItem('token26')
            let payload = { token }
            axios.get(`https://webproject26.herokuapp.com/orders/${restaurantId}`, { params : payload } )
            .then( ( res ) => {
              setOrders(res.data)
              setUpdating(false)
            })
            .catch( err => {} )
            const checkInterval = setInterval(() => {
                let token = localStorage.getItem('token26')
                let payload = { token }
                axios.get(`https://webproject26.herokuapp.com/orders/${restaurantId}`, { params : payload } )
                .then( ( res ) => {
                    setOrders(res.data)
                })
                .catch( err => {} )
            }, 10000)
        return () => clearInterval( checkInterval )
    }, [restaurantId, updating, restaurants])

    let trackedRestaurant = restaurants.filter(restaurant => restaurant.id === restaurantId)

    return (
        <>
            <div className = { styles.topBar }>
                <div className = { styles.statusText }>Orders status: <span className = { styles.restaurantName }>{trackedRestaurant[0]? trackedRestaurant[0].name : '' }</span></div>
                <div className = { styles.buttonsContainer }>
                    { restaurants.map( ( restaurant, index ) => <button key = { index } onClick = {() => selectRestaurant(restaurant.id) } className = { styles.selectRestaurant }>{restaurant.name}</button>)}
                </div>
            </div>
            <div className = { styles.fieldsContainer }>
                <div className = { styles.received }>
                    <div className = { styles.fieldName }>Received</div>
                    { receivedOrders.map( ( order, index ) => <Order key = { index } setOrder = { setUpdating } order = { order } menu = { openMenu } users = { users } button = 'Accept order' />)}
                </div>
                <div className = { styles.accepted }>
                    <div className = { styles.fieldName }>Accepted</div>
                    { acceptedOrders.map( ( order, index ) => <Order key = { index } setOrder = { setUpdating }  order = { order } menu = { openMenu } users = { users } button = 'Send to customer' />)}
                </div>
                <div className = { styles.inDelivery }>
                    <div className = { styles.fieldName }>In delivery</div>
                    { deliveryOrders.map( ( order, index ) => <Order key = { index } order = { order } menu = { openMenu } users = { users } />)}
                </div>
                <div className = { styles.closed }>
                    <div className = { styles.fieldName }>Closed</div>
                    { closedOrders.map( ( order, index ) => <Order key = { index } order = { order } menu = { openMenu } users = { users }/>)}
                </div>
            </div>
        </>
    );
}

export default RestaurantOrders;