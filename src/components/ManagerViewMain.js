import React from 'react';
import styles from './ManagerViewMain.module.css'
import RestaurantBox from './RestaurantBox';


function ManagerViewMain(props) {

    return (
        <div className = { styles.mainContainer }>
            { props.restaurants.map( (restaurant, index) => <RestaurantBox key = { index } restaurant = { {...restaurant} }/>) }
            <div className = { styles.addRestaurant }>+</div>
        </div>
    );
}

export default ManagerViewMain;
