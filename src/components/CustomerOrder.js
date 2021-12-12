import React from 'react'
import styles from './CustomerOrder.module.css'
import axios from 'axios'


function CustomerOrder({ order, restaurant, menuItems, update }) {

    let foodItems = order.foodid.map( ids => menuItems.filter(function(item, id){ return (item.id === ids)}))
    let foodName = foodItems.map( food => food[0]? food[0].name : '' )
    let foodPrice = foodItems.map( food => food[0] ? food[0].cost : 0 )
    let orderDate = order.timestamp.slice(11, 16).concat(' - ', order.timestamp.slice(0, 10).replaceAll('-', '.'))

    let total = foodPrice.reduce((acc, agg) => acc + agg, 0).toFixed(2)
    let status 
    let statusColor

    const acceptOrder = () => {
        let payload = { 
            token : localStorage.getItem('token26'),
            orderid: order.id,
            status: order.status + 1
        }
        axios.put(`https://webproject26.herokuapp.com/orders/${order.restaurantid}`, payload)
        .then( (res) => {
            console.log(res.data)
            update(true)
        })
        .catch( err => console.log(err))
    }

    let button = <button className = {styles.acceptButton } onClick = { acceptOrder }>Close order</button>
    switch(order.status) {
        default:
            status = ''
            break
        case 0:
            status = 'Received'
            statusColor = 'orange'
            break
        case 1:
            status = 'Preparing'
            statusColor = 'blue'
            break
        case 2:
            status = 'In delivery'
            statusColor = 'green'
            break
        case 3:
            status = 'Closed'
            statusColor = 'red'
            break
    }

    return (
        <div className = { styles.orderContainer }>
            <div className = { styles.upperRow}>
                <div className = { styles.restaurantName }>{restaurant.name}</div>
                <div className = { styles.date }>{orderDate}</div>
            </div>
            <div className = { styles.middleRow}>
                <div className = { styles.names }>
                    { foodName.map( (name, index ) => <div key = { index }>{name}</div>) }
                </div>
                <div className = { styles.prices }>
                    { foodPrice.map( ( price, index ) => <div key = {index}>{price}€</div>)}
                </div>
            </div>
            <div className = { styles.lowerRow} >
                <div className = { styles.status } style = { {color: statusColor }}>{status}</div>
                <div className = { styles.total }>total: {total}€</div>
            </div>
            { order.status === 2 ? button : null}
        </div>
    )
}

export default CustomerOrder
