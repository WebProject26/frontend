import React, { useEffect, useState } from 'react';
import styles from './RestaurantOrders.module.css'
import Order from './Order'
import axios from 'axios'

function RestaurantOrders(props) {

    const [ orders, setOrders ] = useState([])
    const [ restaurantId, setRestaurantId ] = useState(0)
    const [ updating, setUpdating ] = useState(false)

    const selectRestaurant = (id) => {
        console.log('doing')
        props.getMenu(id)
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
              console.log(res.data)
              //console.log(restaurantId)
              setOrders(res.data)
              setUpdating(false)
            })
            .catch( err => console.log( err ) )
            const checkInterval = setInterval(() => {
                let token = localStorage.getItem('token26')
                let payload = { token }
                axios.get(`https://webproject26.herokuapp.com/orders/${restaurantId}`, { params : payload } )
                .then( ( res ) => {
                console.log(res.data)
                //console.log(restaurantId)
                setOrders(res.data)
                })
                .catch( err => console.log( err ) )
            }, 10000)
        return () => clearInterval( checkInterval )
    }, [restaurantId, updating])

    let trackedRestaurant = props.restaurants.filter(restaurant => restaurant.id === restaurantId)
    //console.log(props.openMenu)

    return (
        <>
            <div className = { styles.topBar }>
                <div className = { styles.statusText }>Orders status: { trackedRestaurant[0]? trackedRestaurant[0].name : '' } </div>
                <div className = { styles.buttonsContainer }>
                    { props.restaurants.map( ( restaurant, index ) => <button key = { index } onClick = {() => selectRestaurant(restaurant.id) } className = { styles.selectRestaurant }>{restaurant.name}</button>)}
                </div>
            </div>
            <div className = { styles.fieldsContainer }>
                <div className = { styles.received }>
                    <div className = { styles.fieldName }>Received</div>
                    { receivedOrders.map( ( order, index ) => <Order key = { index } setOrder = { setUpdating } order = { order } menu = { props.openMenu } users = { props.users } button = 'Accept order' />)}
                </div>
                <div className = { styles.accepted }>
                    <div className = { styles.fieldName }>Accepted</div>
                    { acceptedOrders.map( ( order, index ) => <Order key = { index } setOrder = { setUpdating }  order = { order } menu = { props.openMenu } users = { props.users } button = 'Send to customer' />)}
                </div>
                <div className = { styles.inDelivery }>
                    <div className = { styles.fieldName }>In delivery</div>
                    { deliveryOrders.map( ( order, index ) => <Order key = { index } order = { order } menu = { props.openMenu } users = { props.users } />)}
                </div>
                <div className = { styles.closed }>
                    <div className = { styles.fieldName }>Closed</div>
                    { closedOrders.map( ( order, index ) => <Order key = { index } order = { order } menu = { props.openMenu } users = { props.users }/>)}
                </div>
            </div>
        </>
    );
}

export default RestaurantOrders;