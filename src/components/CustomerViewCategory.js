import React from 'react'
import styles from './RestaurantCategory.module.css'
import CustomerViewFoodItemBox from './CustomerViewFoodItemBox'

function CustomerViewCategory(props) {

    let categoryItems = props.items

    return (
        <>
            <h1 className = { styles.categoryName }>{props.items[0] ? props.items[0].foodcategory : props.name}</h1>
            <div className = { styles.categoryContainer }>
                { categoryItems.map( (item, index) => <CustomerViewFoodItemBox key = { index } item = { {...item} }/>) }
            </div>
        </>
    )
}

export default CustomerViewCategory
