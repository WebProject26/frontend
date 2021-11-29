import React, {useState} from 'react';
import styles from './RestaurantCategory.module.css'
import FoodItemBox from './FoodItemBox'
import AddFoodItem from './AddFoodItem'

function RestaurantCategory(props) {

    const [ categoryItems, setCategoryItems ] = useState(props.items)

    const [ newItem, setNewItem ] = useState([])

    const addItem = () => {
        setNewItem([...newItem, 'something'])
    }

    const importNewItem = (foodItem) => {
        setCategoryItems([...categoryItems, foodItem])
        setNewItem([])
    }

    console.log(props.items)
    return (
        <>
        <h1 className = { styles.categoryName }>{props.items[0] ? props.items[0].foodcategory : props.name}</h1>
        <div className = { styles.categoryContainer }>
            { categoryItems.map( (item, index) => <FoodItemBox key = { index } item = { {...item} }/>) }
            { newItem.map( (item, index) => <AddFoodItem key = { index } category = { props.items[0] ? props.items[0].foodcategory : props.name } importNewItem = { importNewItem } />) }
            <div className = { styles.addFoodItem } onClick={addItem}>+</div>
        </div>
        </>
    );
}

export default RestaurantCategory;