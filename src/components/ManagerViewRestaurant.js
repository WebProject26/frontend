import React from 'react';
import styles from './ManagerViewRestaurant.module.css'
import RestaurantInfo from './RestaurantInfo'
import RestaurantCategory from './RestaurantCategory'
import { useParams } from 'react-router-dom'
 
function ManagerViewRestaurant(props) {

    const { restaurantId } = useParams()
    let restaurantIinfo = props.restaurants.filter(restaurant => restaurant.id === restaurantId)

    //let backGroundImage = { backGroundImage: `url(${props.restaurants[0].imageURL})` }
    return (
        <div>
            <div className = { styles.testImg } ></div>
            <RestaurantInfo info = {restaurantIinfo[0]}/>
            <RestaurantCategory />
            <RestaurantCategory />
            <button className = { styles.addCategory }>+ Category</button>
        </div>
    );
}

export default ManagerViewRestaurant;