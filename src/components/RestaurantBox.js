import React from 'react';
import styles from './RestaurantBox.module.css'

function RestaurantBox( props ) {
    
    let costLevel = props.restaurant.costlevel
    let dolarSign = ''
    for (let i = 0; i < costLevel; i++) {
        dolarSign += '€'
    }
    let tags = ''
    props.restaurant.tags.map( tag => tags += `${tag} ` )

    return (
        <div className = { styles.boxContainer } >
            <div className = { styles.restaurantBox } style = {{ backgroundImage: `url(${props.restaurant.imageURL})`}}/>
            <div className = { styles.nameRating }>
                <span className = { styles.name }>{ props.restaurant.name }</span>
                <span className = { styles.rating }>*{ props.restaurant.review/10 }/5</span>
            </div>
            <div className = { styles.priceTags }>
                <span className = { styles.price }>{ dolarSign }</span>
                <span className = { styles.tags }>{ tags }</span>
            </div>
        </div>            
    );
}

export default RestaurantBox;