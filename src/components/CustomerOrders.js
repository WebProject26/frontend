import React, { useEffect, useState } from 'react'
import styles from './CustomerOrders.module.css'
import CustomerOrder from './CustomerOrder'
import axios from 'axios'
import { useParams } from 'react-router'

function CustomerOrders({ setOrdersX, setOrdersButtonX, ordersView, setOrdersView, menuItems, openRestaurant }) {

    const { restaurantId } = useParams()

    const hideOrders = () => {
        setOrdersX('100%')
        setOrdersView(false)
        setTimeout( () => {
            setOrdersButtonX('0%')
        }, 1050)
    }

    const [ activeOrders, setActiveOrders ] = useState(true)
    const [ buttonName, setButtonName ] = useState('History')

    const showHideActive = () => {
        setActiveOrders(!activeOrders)
        setButtonName( activeOrders? 'Active' : 'History')
    }

    const [ orders, setOrders] = useState([])
    const [ update, setUpdate ] = useState(false)
    let currentOrders = orders.filter( order => order.restaurantid === restaurantId && order.status < 3 )
    let closedOrders = orders.filter( order => order.restaurantid === restaurantId && order.status === 3)
    console.log(closedOrders)
    console.log(currentOrders)

    useEffect(() => {
        let count 
        if( ordersView ) {
            axios.get('https://webproject26.herokuapp.com/orders', { params: { token: localStorage.getItem('token26')}})
            .then( res => {
                console.log(res.data)
                setOrders(res.data)
            })
            .catch( err => console.error(err))
            console.log('count')
            count = setInterval( () => {
                axios.get('https://webproject26.herokuapp.com/orders', { params: { token: localStorage.getItem('token26')}})
                .then( res => {
                    console.log(res.data)
                    setOrders(res.data)
                })
                .catch( err => console.error(err))
                console.log('count')
            }, 10000) 
        }
        setUpdate(false)
        return () => clearInterval(count)
    }, [ordersView, update])


    return (
        <div className = { styles.ordersContainer }>
            <button className = { styles.closeButton } onClick={hideOrders}>&raquo;</button>
            <div className = { styles.header }>Orders:</div>
            <button className = { styles.historyButton } onClick = { showHideActive }>{buttonName}</button>
            { activeOrders ? currentOrders.map(order => <CustomerOrder key = { order.id }
                                                 order = { order }
                                                 restaurant = { openRestaurant }
                                                 menuItems = { menuItems }
                                                 update = { setUpdate }/>) :
                             closedOrders.map(order => <CustomerOrder key = { order.id}
                                                 order = { order }
                                                 restaurant = { openRestaurant }
                                                 menuItems = { menuItems }/>) }
        </div>
    )
}

export default CustomerOrders
