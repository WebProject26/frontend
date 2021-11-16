import React from 'react';
import styles from './ManagerViewRestaurant.module.css'
import RestaurantInfo from './RestaurantInfo'
import RestaurantCategory from './RestaurantCategory'

function ManagerViewRestaurant(props) {

    //let backGroundImage = { backGroundImage: `url(${props.restaurants[0].imageURL})` }
    return (
        <div>
            <div className = { styles.testImg } ></div>
            <RestaurantInfo />
            <RestaurantCategory />
            <RestaurantCategory />
            <button className = { styles.addCategory }>+ Category</button>
        </div>
    );
}

export default ManagerViewRestaurant;