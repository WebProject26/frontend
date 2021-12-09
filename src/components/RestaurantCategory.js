import React, { useState } from 'react';
import styles from './RestaurantCategory.module.css'
import FoodItemBox from './FoodItemBox'
import AddFoodItem from './AddFoodItem'

function RestaurantCategory(props) {

    let categoryItems = props.items

    const [ newItem, setNewItem ] = useState([])

    const addItem = () => {
        setNewItem([...newItem, 'something'])
    }
    
    return (
        <>
        <h1 className = { styles.categoryName }>{props.items[0] ? props.items[0].foodcategory : props.name}</h1>
        <div className = { styles.categoryContainer }>
            { categoryItems.map( (item, index) => <FoodItemBox key = { index } item = { {...item} } getMenu = { props.getMenu }/>) }
            { newItem.map( (item, index) => <AddFoodItem key = { index } category = { props.items[0] ? props.items[0].foodcategory : props.name } setNewCategory = { props.setNewCategory } setNewItem = { setNewItem } getMenu = { props.getMenu }/>) }
            <div className = { styles.addFoodItem } onClick={addItem}>+</div>
        </div>
        </>
    );
}

export default RestaurantCategory;