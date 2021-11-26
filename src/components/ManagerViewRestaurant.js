import React from 'react';
import styles from './ManagerViewRestaurant.module.css'
import RestaurantInfo from './RestaurantInfo'
import RestaurantCategory from './RestaurantCategory'
//import { useParams } from 'react-router-dom'
 
function ManagerViewRestaurant(props) {

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