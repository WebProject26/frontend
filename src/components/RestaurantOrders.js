import React, { useEffect, useState } from 'react';
import styles from './RestaurantOrders.module.css'
import axios from 'axios'

function RestaurantOrders(props) {

    const [ orders, setOrders ] = useState([])

    useEffect(() => {
        let token = localStorage.getItem('token26')
            let payload = { token }
            axios.get('https://webproject26.herokuapp.com/orders', { params : payload } )
            .then( ( res ) => {
              console.log(res.data)
              setOrders(res.data)
            })
            .catch( err => console.log( err ) )
        setInterval(() => {
            let token = localStorage.getItem('token26')
            let payload = { token }
            axios.get('https://webproject26.herokuapp.com/orders', { params : payload } )
            .then( ( res ) => {
              console.log(res.data)
              setOrders(res.data)
            })
            .catch( err => console.log( err ) )
        }, 15000)
    }, [])

    return (
        <>
            <div className = { styles.topBar }>
                <div className = { styles.statusText }>Orders status</div>
                <div className = { styles.buttonsContainer }>
                    <button className = { styles.selectRestaurant }>Restaurant 1</button>
                    <button className = { styles.selectRestaurant }>Restaurant 2</button>
                </div>
            </div>
            <div className = { styles.fieldsContainer }>
                <div className = { styles.received }>
                    <div className = { styles.fieldName }>Received</div>
                    { orders.map( ( order, index ) => <span key = {index }>{order.id}</span>)}
                </div>
                <div className = { styles.accepted }>
                    <div className = { styles.fieldName }>Accepted</div>
                </div>
                <div className = { styles.inDelivery }>
                    <div className = { styles.fieldName }>In delivery</div>
                </div>
                <div className = { styles.closed }>
                    <div className = { styles.fieldName }>Closed</div>
                </div>
            </div>
        </>
    );
}

export default RestaurantOrders;