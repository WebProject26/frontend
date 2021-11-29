import React, { useState} from 'react';
import styles from './ManagerViewRestaurant.module.css'
import RestaurantInfo from './RestaurantInfo'
import RestaurantCategory from './RestaurantCategory'
import { useParams } from 'react-router';
 
function ManagerViewRestaurant(props) {

    let { restaurantId } = useParams()
    let foodItems = JSON.parse(localStorage.getItem('menu26'))
    const [menuItems, setMenuItems] = useState(foodItems[0].restaurantid === restaurantId ? foodItems : [])
    //console.log(menuItems)

    let uniqueCategories = []
    let [newCategory, setNewCategory] = useState([])

    if(menuItems) {
        let categories = menuItems.map( item => item.foodcategory )
        //console.log(categories)
        let uniqueEntries = (value, index, self) => {
            return self.indexOf(value) === index
        }
        let filteredCategories = categories.filter(uniqueEntries)
        uniqueCategories = filteredCategories
    }

    const addCategory = () => {
        setNewCategory([...newCategory, 'something'])
        console.log(newCategory)
    }

    return (
        <div>
            <div className = { styles.testImg } ></div>
            <RestaurantInfo />
            { uniqueCategories.map((category, index) => <RestaurantCategory key = {index} name = { category } items = { menuItems.filter(item => item.foodcategory === category) }/>) }
            { newCategory.map( (category, index) => <RestaurantCategory key = {index} name = {category} items = { [] }/>)}
            <button className = { styles.addCategory } onClick={addCategory}>+ Category</button>
        </div>
    );
}

export default ManagerViewRestaurant;