import React from 'react'
import RestaurantBox from './RestaurantBox'
import { Link } from 'react-router-dom'
import styles from './ManagerViewMain.module.css'

function CustomerView({restaurants}) {
    return (
        <div className = { styles.mainContainer }>
            { restaurants.map( (restaurant, index) => <div className = { styles.linkContainer } key = { index }>
                                                        <Link to = {restaurant.id} className = { styles.link } key = { index } >
                                                        <RestaurantBox key = { index } restaurant = { {...restaurant} }/></Link>
                                                      </div>) }
        </div>
    )
}

export default CustomerView
