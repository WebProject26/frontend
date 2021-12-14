import React from 'react'
import styles from './Order.module.css'
import axios from 'axios'

function Order(props) {

    let customer = props.users.filter(user => user.id === props.order.userid )

    const acceptSendOrder = () => {
        let payload = { 
            token : localStorage.getItem('token26'),
            orderid: props.order.id,
            status: props.order.status + 1
        }
        axios.put(`https://webproject26.herokuapp.com/orders/${props.order.restaurantid}`, payload)
        .then( (res) => {
            props.setOrder(true)
        })
    }

    return (
        <div className={styles.orderContainer}>
            {props.order.foodid.map( ( id, index)  => <span key = { index }>Item: {props.menu ? props.menu.filter(item => item.id === id)[0] ? props.menu.filter(item => item.id === id)[0].name : '' : '' }</span>)}
            <span>Customer: { customer[0] ? customer[0].firstName + ' ' + customer[0].lastName : '' }</span>
            { props.order.status < 2 ? <button onClick={ acceptSendOrder }>{props.button}</button> :  props.order.status === 2 ? <span className = { styles.inDelivery}>In delivery</span> : <span className = { styles.closed}>Closed</span>}  
        </div>
    )
}

export default Order
