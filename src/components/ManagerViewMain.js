import React from 'react';
import styles from './ManagerViewMain.module.css'
import RestaurantBox from './RestaurantBox';
import { Link } from 'react-router-dom'



function ManagerViewMain(props) {


    const setOpenRestaurant = (restaurant) => {
        localStorage.removeItem('openRestaurant')
        localStorage.setItem('openRestaurant', JSON.stringify(restaurant))
        props.getMenuItems(restaurant.id)
    }
    

    return (
        <div className = { styles.mainContainer }>
            { props.restaurants.map( (restaurant, index) => <Link to = {restaurant.id} className = { styles.link } key = { index } onClick = { () => {setOpenRestaurant(restaurant)}}><RestaurantBox key = { index } restaurant = { {...restaurant} }/></Link>) }
            <div className = { styles.addRestaurant }>+</div>
        </div>
    );
}

export default ManagerViewMain;
