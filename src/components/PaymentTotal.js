import React from 'react'
import styles from './PaymentTotal.module.css'
import { useParams } from 'react-router'
import axios from 'axios'

const PaymentTotal = ({itemsTotal, deliveryFee, orderItems, updateInfo }) => {

    const { restaurantId } = useParams()

    let delivery = deliveryFee
    itemsTotal === 0 ? delivery = 0 : delivery = deliveryFee

    const makeOrder = () => {
        let payload = {
            token: localStorage.getItem('token26'),
            foodids: orderItems
        }
        axios.post(`https://webproject26.herokuapp.com/orders/${restaurantId}`, payload)
        .then( res => {
            console.log(res)
            orderItems.map(function(id){
                let payload = { 
                    token: localStorage.getItem('token26'),
                    menuitem: id
                }
                axios.delete('https://webproject26.herokuapp.com/cart', { data: payload })
                .then( res => {
                    console.log(res)
                    updateInfo(res.data)
                })
                .catch( err => console.error(err))
                return true
            })
        })
        .catch( err => console.error(err))
        console.log('restaurant id is ' + restaurantId)
        console.log('items to order are: ' + orderItems)
    }

    return(
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.itemContainer}>
                    <h2 className={styles.total}>Items Total</h2>
                    <h2 className={styles.total}>{ itemsTotal.toFixed(2) }€</h2>
                </div>
                <div className={styles.itemContainer}>
                    <h2 className={styles.total}>Delivery Fee</h2>
                    <h2 className={styles.total}>{delivery.toFixed(2)}€</h2>
                </div>
                <div className={styles.itemContainer}>
                    <h2 className={styles.total}>Total</h2>
                    <h2 className={styles.total}>{itemsTotal === 0 ? itemsTotal.toFixed(2) : (itemsTotal + delivery).toFixed(2) }€</h2>
                </div> 
            </div>
            { orderItems[0] ? <button className={styles.button} onClick={ makeOrder }>PAYMENT</button> : null}

        </div>
    )

}
export default PaymentTotal