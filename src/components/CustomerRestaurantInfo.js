import React from 'react'
import styles from './RestaurantInfo.module.css'

function CustomerRestaurantInfo(props) {

    let restaurant = props.openRestaurant

    return (
        <div className = { styles.editContainer }> 
                    <div className = { styles.separateEdits }>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Restaurant name:</span>
                            <span className = { styles.fieldValue }>{ !restaurant ? '' : restaurant.name}</span>
                            <span className = { styles.fieldName }>Restaurant address:</span>
                            <span className = { styles.fieldValue }>{ !restaurant ? '' : restaurant.address}</span>
                            <span className = { styles.fieldName }>Email address:</span>
                            <span className = { styles.fieldValue }>{ !restaurant ? '' : restaurant.emailAddress}</span>
                        </div>
                    </div>
                    <div className = { styles.separateEdits }>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Restaurant Webpage:</span>
                            <span className = { styles.fieldValue }>{ !restaurant ? '' : restaurant.website}</span>
                        </div>
                        <div className = { styles.info }>
                            <div className = { styles.hoursPrice }>
                                <div className = { styles.hours }>
                                    <span className = { styles.fieldName }>Opening hours:</span>
                                    <span className = { styles.fieldValue }>{ !restaurant ? 12 : restaurant.openinghours[0].slice(11, 13)}:{ !restaurant ? 12 : restaurant.openinghours[0].slice(14, 16)} to { !restaurant ? 12 : restaurant.openinghours[1].slice(11, 13)}:{ !restaurant ? 12 : restaurant.openinghours[1].slice(14, 16)}</span>
                                </div>
                                
                            </div>
                        </div>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Phone number:</span>
                            <span className = { styles.fieldValue }>{ !restaurant ? 1234 : restaurant.phoneNumber}</span>
                        </div>
                    </div>
                    <div className = { styles.separateEdits }>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Tags:</span>
                            <span className = { styles.fieldValue }>{ !restaurant ? '' : restaurant.tags.map(tag => ' ' + tag)} </span>
                            <span className = { styles.fieldName }>Delivery fee:</span>
                            <span className = { styles.fieldValue }>€{ !restaurant ? 0 : restaurant.deliveryfee}</span>
                        </div>
                        <div className = { styles.priceLevels }>
                            <span className = { styles.fieldName }>Price level:</span>
                            <span className = { styles.fieldValue }>{ !restaurant ? 1 : restaurant.costlevel}/5</span>
                        </div>
                    </div>
                </div>
    )
}

export default CustomerRestaurantInfo
