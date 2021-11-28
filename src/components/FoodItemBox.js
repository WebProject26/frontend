import React from 'react'
import styles from './FoodItemBox.module.css'

export default function FoodItemBox(props) {

    //console.log(props)
    return (
        <div className = { styles.boxContainer } >
            <div className = { styles.foodBox } style = {{ backgroundImage: `url(${props.item.imageURL})`}}/>
            <div className = { styles.namePrice }>
                <span className = { styles.name }>{ props.item.name }</span>
                <span className = { styles.cost }>{ props.item.cost }</span>
            </div>
            <div className = { styles.description }>
                <span className = { styles.description }>{ props.item.description }</span>
            </div>
        </div>          
    )
}

