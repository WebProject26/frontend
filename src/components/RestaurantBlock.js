import React from 'react';
import styles from './RestaurantBlock.module.css';


export default function RestaurantBlock(props) {
    return (
    <div className= {styles.name}>
        <div>
            <img src={props.image} width="400" height="400"></img>
            <div>{props.name}</div>
            <div>{props.foodtype}</div>
            <div>{props.rating}</div>
            <div>{props.pricerating}</div>
        </div>
    </div>
    )
}
