import React from 'react'
import styles from './AddFoodItem.module.css'

export default function FoodItemBox(props) {



    return (
        <div className = { styles.boxContainer } >
            <div className = { styles.foodBox } >
                Item name:
                <input className = { styles.input }></input>
                Description: 
                <input className = { styles.input }></input>
                Price:
                <input className = { styles.input }></input>
            </div>
            <button className = { styles.saveButton }>Save</button>
        </div>          
    )
}