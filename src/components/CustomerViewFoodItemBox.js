import React from 'react'
import styles from './FoodItemBox.module.css'
import axios from 'axios'

function CustomerViewFoodItemBox(props) {

    const addToCart = (foodItemId) => { 
        let payload = {
            token: localStorage.getItem('token26'),
            menuitem: foodItemId
        }
        axios.post('https://webproject26.herokuapp.com/cart', payload)
        .then( res => {
            console.log(res)
            props.updateInfo(res.data)
        })
        .catch( err => console.log(err))
    }

    return (
        <div className = { styles.boxContainer } >
            <div className = { styles.foodBox } style = {{ backgroundImage: `url(${props.item.imageURL})`}}/>
                <div className = { styles.namePrice }>
                    <span className = { styles.name }>{ props.item.name }</span>
                    <span className = { styles.cost }>€{ props.item.cost }</span>
                </div>
                <div className = { styles.description }>
                    <span className = { styles.description }>{ props.item.description }</span>
                </div>
                <div className = { styles.buttonsDiv }>
                    <button className = { styles.deleteEdit } onClick={() => addToCart(props.item.id) }>Add to cart</button>
                </div>
        </div>
    )
}

export default CustomerViewFoodItemBox
