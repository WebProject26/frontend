import React, { useState} from 'react';
import styles from './ManagerViewRestaurant.module.css'
import RestaurantInfo from './RestaurantInfo'
import RestaurantCategory from './RestaurantCategory'
import { useParams } from 'react-router';
 
function ManagerViewRestaurant(props) {

    let { restaurantId } = useParams()
    let foodItems = JSON.parse(localStorage.getItem('menu26'))
    //const [ menuItems, setMenuItems ] = useState([])
    let menuItems = foodItems[0].restaurantid === restaurantId ? foodItems : []
    
    let uniqueCategories = []
    let [newCategory, setNewCategory] = useState([])

    let categories = menuItems.map( item => item.foodcategory )
    let uniqueEntries = (value, index, self) => {
        return self.indexOf(value) === index
    }
    let filteredCategories = categories.filter(uniqueEntries)
    uniqueCategories = filteredCategories

    const [ categoryName, setCategoryName ] = useState('')
    const addCategoryName = (event) => {
        setCategoryName(event.target.value)
    }

    const removeName = (event) => {
        event.target.value = ''
    }

    const addCategory = () => {
        if(categoryName === '') {
            alert('please input category name')
        } else {
            setNewCategory([...newCategory, categoryName])
            console.log(newCategory)
        }
    }

    return (
        <div>
            <div className = { styles.testImg } ></div>
            <RestaurantInfo />
            { uniqueCategories.map((category, index) => <RestaurantCategory key = {index} name = { category } items = { menuItems.filter(item => item.foodcategory === category) } getMenu = { props.getMenu } />) }
            { newCategory.map( (category, index) => <RestaurantCategory key = {index} name = {category} items = { [] } getMenu = { props.getMenu } />)}
            <input type = 'text' className = { styles.newCategory } placeholder = "Category name" onChange = { addCategoryName } onBlur = { removeName } ></input>
            <button className = { styles.addCategory } onClick={addCategory}>Add category</button>
        </div>
    );
}

export default ManagerViewRestaurant;