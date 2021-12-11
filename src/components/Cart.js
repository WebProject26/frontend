import React from 'react';
import CartItem from './CartItem';
import PaymentTotal from './PaymentTotal';
import styles from './Cart.module.css'


const Cart = ({menuItems, cartItemsIds, restaurant, updateInfo }) => {

    let menuItemsIds = menuItems.map(item => item.id) //Extract the Ids of the food items in the current menu
    console.log(menuItemsIds)

    let currentRestaurantItems = cartItemsIds.filter(id => menuItemsIds.indexOf(id) !== -1) // From all items in the cart, extract only those that are valid for the current restaurant
    console.log(currentRestaurantItems)

    let idAndAmount = Object.entries( currentRestaurantItems.reduce( (map, object) => (
        {...map, [object] : (map[object] || 0) + 1}
    ), {})) // sum all repeating Ids in an object with value pairs as follows: { food ID : number of occurances }. Then all pairs are extracted in an array with name idAndAmount.
            // idAndAmount contains arrays with each food ID as first value, and the amount as second value. idAndAmount is used to map all the cart items for the current restaurant.

    let foodItemArray = currentRestaurantItems.map(id => menuItems.filter( item => item.id === id )) //Extract each item from the menu, that is in the shopping cart
    let foodItemsArray = foodItemArray.map(array => array[0]) // combine all food items in a single array
    let foodItemsArrayWithAmount = foodItemsArray.map(item => item = {...item, amount: 1}) // adding amount to the items for price calculation

    let itemsTotal = 0
    if(foodItemsArrayWithAmount[0]) { 
        itemsTotal = foodItemsArrayWithAmount.reduce((previous, current) => {
            const price = current.cost * current.amount
            return previous + price
        },0)
    }

  return ( 
    <div className={styles.container}>
        <div className={styles.innerContainer}>
            <div className={styles.innerContainer2}>
                <div className={styles.upperContainer}>
                    <h1 className={styles.restName}>{restaurant? restaurant.name : ''}</h1>
                    {idAndAmount.map( idArray  => <CartItem key = {idArray[0]} itemId = { idArray[0] } amount={idArray[1]} menuItems = { menuItems } updateInfo = { updateInfo } />)}
                </div>
                <PaymentTotal itemsTotal={itemsTotal} deliveryFee = { restaurant? restaurant.deliveryfee : 0 } orderItems = { currentRestaurantItems } updateInfo = { updateInfo } /> 
            </div>       
        </div>
    </div>
  ) 

}

export default Cart;