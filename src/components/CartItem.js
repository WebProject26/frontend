import React from 'react';
import styles from './CartItem.module.css'
import axios from 'axios'

const CartItem = ({ itemId, amount, menuItems, updateInfo }) => {
    
    let item = menuItems.filter( item => item.id === itemId)[0]

    let payload = {
        token: localStorage.getItem('token26'),
        menuitem: item.id
    }

    const deleteItem = () => {
        axios.delete('https://webproject26.herokuapp.com/cart', { data: payload } )
        .then( res => {
            updateInfo(res.data)
        })
        .catch( err => console.log(err))
    }  
    const incrementItem = () => {
        axios.post('https://webproject26.herokuapp.com/cart', payload)
        .then( res => {
            updateInfo(res.data)
        })
        .catch( err => console.log(err))
    }
  
    const decrementItem = () => {
        axios.delete('https://webproject26.herokuapp.com/cart', { data: payload } )
        .then( res => {
            updateInfo(res.data)
        })
        .catch( err => console.log(err))
  }
    
    return(
        <div className={styles.container}>
            <div className={styles.itemContainer}>
                <div className={styles.itemLine}>
                    <p className={styles.paragraph} style={{cursor: "pointer", fontSize: "20px"}} onClick={ deleteItem }>X</p>
                    <p className={styles.paragraph}>{ item ? item.name : ''}</p>
                </div>
                <p className={styles.paragraph}>{ item ? item.cost : 0}€</p>
            </div>
            <div className={styles.quantity}>
                {amount <= 1 ? null: <p className={styles.paragraph} onClick={ decrementItem } style={{cursor: "pointer"}}>-</p>}
                <p className={styles.paragraph}>{amount}</p>
                <p className={styles.paragraph} onClick={ incrementItem } style={{cursor: "pointer"}}>+</p>
            </div>
        </div>


    )
}

export default CartItem