import React, { useState } from 'react';
import styles from './RestaurantCategory.module.css'
import FoodItemBox from './FoodItemBox'
import AddFoodItem from './AddFoodItem'

function RestaurantCategory(props) {


    const [ newItem, setNewItem ] = useState([])

    const addItem = () => {
        setNewItem([...newItem, 'something'])
    }
    
    return (
        <>
        <h1 className = { styles.categoryName }>{props.items[0] ? props.items[0].foodcategory : props.name}</h1>
        <div className = { styles.categoryContainer }>
            { props.items.map( (item, index) => <FoodItemBox key = { item.id } item = { {...item} } updateInfo = { props.setUpdatingInfo }/>) }
            { newItem.map( (item, index) => <AddFoodItem key = { index } category = { props.items[0] ? props.items[0].foodcategory : props.categoryName } setNewCategory = { props.setNewCategory } setNewItem = { setNewItem } updateInfo = { props.setUpdatingInfo } />) }
            <div className = { styles.addFoodItem } onClick={addItem}>+</div>
        </div>
        </>
    );
}

export default RestaurantCategory;