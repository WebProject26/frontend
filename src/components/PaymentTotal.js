import React, { useState } from 'react'
import styles from './PaymentTotal.module.css'
import { useParams } from 'react-router'
import axios from 'axios'

const PaymentTotal = ({itemsTotal, deliveryFee, orderItems, updateInfo }) => {

    const { restaurantId } = useParams()

    let delivery = deliveryFee
    itemsTotal === 0 ? delivery = 0 : delivery = deliveryFee

    const makeOrder = (event) => {
        event.preventDefault()
        if( event.target.address.value === '' || event.target.card.value === '' ) {
            alert('Please fill in all fields!')
        } else {
            
        let payload = {
            token: localStorage.getItem('token26'),
            foodids: orderItems
        }
        axios.post(`https://webproject26.herokuapp.com/orders/${restaurantId}`, payload)
        .then( res => {
            console.log(res)
            setPaymentX('100%')
            event.target.address.value = ''
            event.target.card.value = ''
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
    }

    const [ paymentX, setPaymentX ] = useState('100%')
    const showPayment = () => {
        setPaymentX('0%')
    }
    const hidePayment = () => {
        setPaymentX('100%')
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
            { orderItems[0] ? <button className={styles.button} onClick={ showPayment }>PAYMENT</button> : null}
            <div className = { styles.paymentContainer } style = {{ transform: `translateX(${paymentX})`}}>
                <button className = { styles.closePaymentButton } onClick = { hidePayment }>&raquo;</button>
                <div className = { styles.paymentInfo }>You are about to pay: {(itemsTotal + delivery).toFixed(2) }€</div>
                <form className={styles.paymentForm} onSubmit={ makeOrder }>
                    <input name = 'address' type = 'text' placeholder = 'Address' className={styles.paymentInput}></input>
                    <input name = 'card' type = 'number' placeholder = 'Card number' className={styles.paymentInput}></input>
                    <button type = 'submit' className={styles.payButton}>Pay</button>
                </form>
            </div>
        </div>
    )

}
export default PaymentTotal