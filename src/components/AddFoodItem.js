import React, { useState } from 'react'
import styles from './AddFoodItem.module.css'
import { useParams } from 'react-router'
import axios from 'axios'

export default function AddFoodItemBox(props) {

    //let menuItems = JSON.parse(localStorage.getItem('menu26'))

    let { restaurantId } = useParams()

    const [ itemName, setItemName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState('')

    const nameSet = (event) => {
        setItemName(event.target.value)
    }

    const descriptionSet = (event) => {
        setDescription(event.target.value)
    }

    const priceSet = (event) => {
        setPrice(event.target.value)
    }

    let payload = { 
        token: localStorage.getItem('token26'),
        itemName: itemName,
        description: description,
        cost: price,
        imageURL: "https://i.redd.it/l8ts2vmr85y71.png",
        foodcategory: props.category
    }

    /*
    let newItem = { 
        name: itemName,
        description: description,
        cost: price,
        imageURL: "https://i.redd.it/l8ts2vmr85y71.png",
        foodcategory: props.category,
        restaurantid: restaurantId
    }
    */

    const saveItem = () => {
        console.log(payload)
        axios.post(`https://webproject26.herokuapp.com/menu/${restaurantId}`, payload)
        .then( (res) => {
            console.log(res)
            props.getMenu(restaurantId)
        })
        .catch( err => console.log(err))
        //props.importNewItem(newItem)
        //menuItems.push(newItem);
        //localStorage.setItem('menu26', JSON.stringify(menuItems));
    }

    return (
        <div className = { styles.boxContainer } >
            <div className = { styles.foodBox } >
                Item name:
                <input className = { styles.input } onChange={ nameSet }></input>
                Description: 
                <input className = { styles.input } onChange={ descriptionSet }></input>
                Price:
                <input className = { styles.input } onChange={ priceSet }></input>
            </div>
            <button className = { styles.saveButton } onClick={ saveItem }>Save</button>
        </div>          
    )
}