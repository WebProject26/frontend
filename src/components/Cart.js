import React from 'react';
import CartItem from './CartItem';
import PaymentTotal from './PaymentTotal';
import styles from './Cart.module.css'


const Cart = ({items, deleteItem, incrementItem, decrementItem}) => {
const itemsTotal = items.reduce((previous, current) => {
    const price = current.item.cost * current.amount
    return previous + price
},0)

  return ( 
    <div className={styles.container}>
        <div className={styles.innerContainer}>
            <div className={styles.innerContainer2}>
                <div className={styles.upperContainer}>
                    <h1 className={styles.restName}>Restaurant Name</h1>
                    <h3 className={styles.eta}>ETA</h3>
                    {items.map((item) => <CartItem item={item.item} amount={item.amount} deleteItem={deleteItem} incrementItem={incrementItem} decrementItem={decrementItem} />)}
                </div>
                <PaymentTotal itemsTotal={itemsTotal}/> 
            </div>       
        </div>
    </div>
  ) 

}

export default Cart;
