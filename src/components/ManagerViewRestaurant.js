import React, { useState } from 'react';
import styles from './ManagerViewRestaurant.module.css'
import RestaurantInfo from './RestaurantInfo'
import RestaurantCategory from './RestaurantCategory'
import { useParams } from 'react-router';

 
function ManagerViewRestaurant(props) {

    let { restaurantId } = useParams()

    if (!props.openRestaurant || props.openRestaurant.id !== restaurantId) {
        props.setOpenRestaurant(restaurantId)
    }

    let menuItems

    if ( !props.openMenu ) {
        menuItems = []
        props.getMenu(restaurantId)
    } else if( props.openMenu[0] === 'error') {
        menuItems = []
    } else if( props.openMenu[0].restaurantid !== restaurantId ) {
        menuItems = []
        props.getMenu(restaurantId)
    } else {
        menuItems = props.openMenu
    }
    
    let uniqueCategories = []
    let [newCategory, setNewCategory] = useState([])

    let categories = menuItems.map( item => item.foodcategory )
    let uniqueEntries = (value, index, self) => {
        return self.indexOf(value) === index
    }
    let filteredCategories = categories.filter(uniqueEntries)
    uniqueCategories = filteredCategories

    const addCategory = (event) => {
        event.preventDefault()
        if(event.target.categoryName.value === '') {
            alert('please input category name')
        } else {
            setNewCategory([...newCategory, event.target.categoryName.value])
            console.log(newCategory)
            event.target.categoryName.value = ''
        }
    }

    return (
        <div>
            <div className = { styles.testImg } ></div>
            <RestaurantInfo openRestaurant = { props.openRestaurant } setOpenRestaurant = { props.setOpenRestaurant }/>
            { uniqueCategories.map((category, index) => <RestaurantCategory key = {index} name = { category } items = { menuItems.filter(item => item.foodcategory === category) } getMenu = { props.getMenu } />) }
            { newCategory.map( (category, index) => <RestaurantCategory key = {index} name = {category} items = { [] } getMenu = { props.getMenu } />)}
            <form className = { styles.newCategoryContainer } onSubmit = { addCategory }>
                <input type = 'text' name = 'categoryName' className = { styles.newCategory } placeholder = "Category name" ></input>
                <button className = { styles.addCategoryButton } type = 'submit'>Add category</button>
            </form>
        </div>
    );
}

export default ManagerViewRestaurant;