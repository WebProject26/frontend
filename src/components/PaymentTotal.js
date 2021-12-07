import React from 'react'
import styles from './PaymentTotal.module.css'

const PaymentTotal = ({itemsTotal}) => {
    const deliveryFee = itemsTotal === 0 ? itemsTotal.toString() : parseInt(5).toFixed(2)
    return(
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.itemContainer}>
                    <h2 className={styles.total}>Items Total</h2>
                    <h2 className={styles.total}>{itemsTotal === 0 ? itemsTotal : itemsTotal.toFixed(2)}€</h2>
                </div>
                <div className={styles.itemContainer}>
                    <h2 className={styles.total}>Delivery Fee</h2>
                    <h2 className={styles.total}>{deliveryFee}€</h2>
                </div>
                <div className={styles.itemContainer}>
                    <h2 className={styles.total}>Total</h2>
                    <h2 className={styles.total}>{itemsTotal === 0 ? itemsTotal : deliveryFee.includes("5.00") ? (itemsTotal + parseInt(deliveryFee)).toFixed(2) : itemsTotal}€</h2>
                </div> 
            </div>
            <button className={styles.button}>PAYMENT</button>
        </div>
    )

}
export default PaymentTotal