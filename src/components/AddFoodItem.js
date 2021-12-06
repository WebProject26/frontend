import React from 'react'
import styles from './AddFoodItem.module.css'
import { useParams } from 'react-router'
import axios from 'axios'

export default function AddFoodItemBox(props) {

    //let menuItems = JSON.parse(localStorage.getItem('menu26'))

    let { restaurantId } = useParams()

    const saveItem = (event) => {
        event.preventDefault()
        let payload = { 
            token: localStorage.getItem('token26'),
            itemName: event.target.name.value,
            description: event.target.description.value,
            cost: event.target.price.value,
            imageURL: "https://i.redd.it/l8ts2vmr85y71.png",
            foodcategory: props.category
        }

        axios.post(`https://webproject26.herokuapp.com/menu/${restaurantId}`, payload)
        .then( (res) => {
            console.log(res)
            props.setNewItem([])
            props.getMenu(restaurantId)
        })
        .catch( err => console.log(err))
    }

    return (
        <form className = { styles.boxContainer } onSubmit={ saveItem }>
            <div className = { styles.foodBox } >
                Item name:
                <input name = 'name' className = { styles.input }></input>
                Description: 
                <input name = 'description' className = { styles.input }></input>
                Price:
                <input name = 'price' className = { styles.input }></input>
            </div>
            <button type = 'submit' className = { styles.saveButton }>Save</button>
        </form>          
    )
}