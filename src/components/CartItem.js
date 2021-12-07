import React from 'react';
import styles from './CartItem.module.css'

const CartItem = ({item, amount, deleteItem, decrementItem, incrementItem}) => {
    return(
        <div className={styles.container}>
            <div className={styles.itemContainer}>
                <div className={styles.itemLine}>
                    <p className={styles.paragraph} style={{cursor: "pointer", fontSize: "20px"}} onClick={() => deleteItem(item)}>X</p>
                    <p className={styles.paragraph}>{item.name}</p>
                </div>
                <p className={styles.paragraph}>{item.cost}€</p>
            </div>
            <div className={styles.quantity}>
                {amount <= 1 ? null: <p className={styles.paragraph} onClick={() => decrementItem(item.id)} style={{cursor: "pointer"}}>-</p>}
                <p className={styles.paragraph}>{amount}</p>
                <p className={styles.paragraph} onClick={() => incrementItem(item.id)} style={{cursor: "pointer"}}>+</p>
            </div>
        </div>


    )
}

export default CartItem