import React, { useEffect, useState } from 'react';
import styles from './ManagerViewRestaurant.module.css'
import CustomerRestaurantInfo from './CustomerRestaurantInfo'
import CustomerViewCategory from './CustomerViewCategory'
import { useParams } from 'react-router';
import axios from 'axios'

function CustomerViewRestaurant(props) {

    let { restaurantId } = useParams()
  
    const [ openRestaurant, setOpenRestaurant ] = useState(null)
    const [ menuItems, setMenuItems ] = useState([])
    useEffect(() => {
        axios.get(`https://webproject26.herokuapp.com/restaurants/${restaurantId}`)
        .then( res => {
            setOpenRestaurant(res.data)
        })
        .catch( err => {
            console.error( err )
        })
        axios.get(`https://webproject26.herokuapp.com/menu/${restaurantId}`)
        .then( (res) => {
            setMenuItems(res.data)
        })
        .catch( (err) => {
            console.log( err )
        })
    }, [restaurantId])
    console.log(menuItems)

    let uniqueCategories = []

    let categories = menuItems.map( item => item.foodcategory )
    let uniqueEntries = (value, index, self) => {
        return self.indexOf(value) === index
    }
    let filteredCategories = categories.filter(uniqueEntries)
    uniqueCategories = filteredCategories

    return (
        <div>
            <div className = { styles.testImg } style = { { backgroundImage: openRestaurant? `url(${openRestaurant.imageURL})` : ''}}></div>
            <CustomerRestaurantInfo openRestaurant = { openRestaurant }/>
            { uniqueCategories.map((category, index) => <CustomerViewCategory key = {index} name = { category } items = { menuItems.filter(item => item.foodcategory === category) }/>) }
        </div>
    )
}

export default CustomerViewRestaurant
