import React from 'react';
import styles from './ManagerViewMain.module.css'
import RestaurantBox from './RestaurantBox';
import { Link } from 'react-router-dom'



function ManagerViewMain(props) {

    return (
        <div className = { styles.mainContainer }>
            { props.restaurants.map( (restaurant, index) => <Link to = {`:${restaurant.id}`} className = { styles.link } key = { index }><RestaurantBox key = { index } restaurant = { {...restaurant} }/></Link>) }
            <div className = { styles.addRestaurant }>+</div>
        </div>
    );
}

export default ManagerViewMain;
