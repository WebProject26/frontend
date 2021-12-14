import React, { useState } from 'react';
import styles from './RestaurantCategory.module.css'
import FoodItemBox from './FoodItemBox'
import AddFoodItem from './AddFoodItem'

function RestaurantCategory({ category, items, setNewCategory, setUpdatingInfo } ) {


    const [ newItem, setNewItem ] = useState([])

    const addItem = () => {
        setNewItem([...newItem, 'something'])
    }
    
    return (
        <>
        <h1 className = { styles.categoryName }>{items[0] ? items[0].foodcategory : category}</h1>
        <div className = { styles.categoryContainer }>
            { items.map( (item, index) => <FoodItemBox key = { item.id } item = { {...item} } updateInfo = { setUpdatingInfo }/>) }
            { newItem.map( (item, index) => <AddFoodItem key = { index } category = { items[0] ? items[0].foodcategory : category } setNewCategory = { setNewCategory } setNewItem = { setNewItem } updateInfo = { setUpdatingInfo } />) }
            <div className = { styles.addFoodItem } onClick={addItem}>+</div>
        </div>
        </>
    );
}

export default RestaurantCategory;