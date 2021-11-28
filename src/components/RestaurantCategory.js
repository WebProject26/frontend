import React, {useState} from 'react';
import styles from './RestaurantCategory.module.css'
import FoodItemBox from './FoodItemBox'

function RestaurantCategory(props) {

    const [ newItem, setNewItem ] = useState([])

    const addItem = () => {
        setNewItem([...newItem, 'something'])
    }

    console.log(props.items)
    return (
        <>
        <h1 className = { styles.categoryName }>{props.items[0] ? props.items[0].foodcategory : ''}</h1>
        <div className = { styles.categoryContainer }>
            { props.items.map( (item, index) => <FoodItemBox key = { index } item = { {...item} }/>) }
            { newItem.map( (item, index) => <FoodItemBox key = { index } item = { {...item} }/>) }
            <div className = { styles.addFoodItem } onClick={addItem}>+</div>
        </div>
        </>
    );
}

export default RestaurantCategory;