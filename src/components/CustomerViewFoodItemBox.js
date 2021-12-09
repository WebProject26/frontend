import React from 'react'
import styles from './FoodItemBox.module.css'

function CustomerViewFoodItemBox(props) {
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
                    <button className = { styles.deleteEdit }>Add to cart</button>
                </div>
        </div>
    )
}

export default CustomerViewFoodItemBox
