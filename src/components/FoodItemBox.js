import React, { useState } from 'react'
import styles from './FoodItemBox.module.css'
import axios from 'axios'

export default function FoodItemBox(props) {

    console.log(props.item)

    const deleteItem = () => {
        let token = localStorage.getItem('token26')
        let payload = { 
            token: token,
            itemid: props.item.id
        }
        axios.delete(`https://webproject26.herokuapp.com/menu/${props.item.restaurantid}`, { data: payload })
        .then( (res) => {
            console.log(res)
            props.getMenu(props.item.restaurantid)
        })
        .catch( err => console.log(err))
    }

    const saveEdit = (event) => {
        event.preventDefault()
        let token = localStorage.getItem('token26')
        let payload = { 
            token: token,
            itemid: props.item.id,
            itemName: event.target.name.value,
            description: event.target.description.value,
            cost: event.target.price.value,
            foodcategory: props.item.foodcategory
        }
        axios.put(`https://webproject26.herokuapp.com/menu/${props.item.restaurantid}`, payload )
        .then( res => {
            setOutput(savedItem)
            console.log(res)
            props.getMenu(props.item.restaurantid)
        })
        .catch(err=> console.log(err))
    }

    const editItem = <form className = { styles.boxContainer } onSubmit = { saveEdit }>
                        <div className = { styles.foodBox } >
                            Item name:
                            <input name = 'name' className = { styles.input } defaultValue = { props.item.name }></input>
                            Description: 
                            <input name = 'description' className = { styles.input } defaultValue = { props.item.description }></input>
                            Price:
                            <input name = 'price' className = { styles.input } defaultValue = { props.item.cost }></input>
                        </div>
                        <button type ='submit' className = { styles.saveButton } >Save</button>
                    </form>
    
    const savedItem = <div className = { styles.boxContainer } >
                        <div className = { styles.foodBox } style = {{ backgroundImage: `url(${props.item.imageURL})`}}/>
                        <div className = { styles.namePrice }>
                            <span className = { styles.name }>{ props.item.name }</span>
                            <span className = { styles.cost }>{ props.item.cost }</span>
                        </div>
                        <div className = { styles.description }>
                            <span className = { styles.description }>{ props.item.description }</span>
                        </div>
                        <div className = { styles.buttonsDiv }>
                            <button className = { styles.deleteEdit } onClick = { deleteItem }>Delete</button>
                            <button className = { styles.deleteEdit } onClick = { () => { setOutput( editItem )} }>Edit</button>
                        </div>
                      </div>

    const [ output, setOutput ] = useState(savedItem)

    return (
        <>{ output }</>
    )
}

