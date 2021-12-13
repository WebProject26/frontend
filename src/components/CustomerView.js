import React from 'react'
import RestaurantBox from './RestaurantBox'
import { Link } from 'react-router-dom'
import styles from './CustomerView.module.css'

function CustomerView({restaurants, search}) {

    const searchFilter = (event) => {
        search(event.target.value)
    }

    return (
        <div className = { styles.outterContainer }>
            <input className = { styles.search } placeholder = 'What are you craving?        🔎︎' onChange = { searchFilter }></input>
            <div className = { styles.mainContainer }>
                { restaurants.map( (restaurant, index) => <div className = { styles.linkContainer } key = { index }>
                                                            <Link to = {restaurant.id} className = { styles.link } key = { index } >
                                                            <RestaurantBox key = { index } restaurant = { {...restaurant} }/></Link>
                                                        </div>) }
            </div>
        </div>
    )
}

export default CustomerView
