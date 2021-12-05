import React, { useState } from 'react';
import styles from './RestaurantInfo.module.css'
import axios from 'axios'

function RestaurantInfo(props) {

    let restaurant = JSON.parse(localStorage.getItem('openRestaurant'))
    //console.log(restaurant)

    let priceArray = [1, 2, 3, 4, 5]
    const [ priceLevel, setPriceLevel ] = useState(restaurant.costlevel)
    function chooseLevel(level) {
        setPriceLevel(priceArray[level])
    }    
    
    const [ edit, setEdit ] = useState(false)

    function editSave() {
        edit? setEdit(false) : setEdit(true)
        //console.log(payload)
    }

    const openHourField = (event) => {
        event.preventDefault()
        let value = event.target.value
        value > 23 ? event.target.value = 23 : event.target.value = value     
    }
    const closeHourField = (event) => {
        event.preventDefault()
        let value = event.target.value
        value > 23 ? event.target.value = 23 : event.target.value = value
    }
    const openMinutesField = (event) => {
        event.preventDefault()
        let value = event.target.value
        value > 59 ? event.target.value = 59 : event.target.value = value    
    }
    const closeMinutesField = (event) => {
        event.preventDefault()
        let value = event.target.value
        value > 59 ? event.target.value = 59 : event.target.value = value    
    }

    const saveInfo = (event) => {
        event.preventDefault()
        let name = event.target.name.value
        let address = event.target.address.value
        let email = event.target.email.value
        let website = event.target.website.value
        let hoursOpen = event.target.hoursOpen.value
        let minutesOpen = event.target.minutesOpen.value
        let hoursClose = event.target.hoursClose.value
        let minutesClose = event.target.minutesClose.value
        let costLevel = priceLevel
        let phone = event.target.phone.value
        let tags = event.target.tags.value.split(',')
        let delivery = event.target.delivery.value

        if( hoursOpen < 10 && hoursOpen.length < 2 ) {
            hoursOpen = 0 + hoursOpen;
        }
        if( hoursClose < 10 && hoursClose.length < 2 ) {
            hoursClose = 0 + hoursClose;
        }
        if( minutesOpen < 10 && minutesOpen.length < 2 ) {
            minutesOpen = 0 + minutesOpen;
        }
        if( minutesClose < 10 && minutesClose.length < 2 ) {
            minutesClose = 0 + minutesClose;
        }

        let localSave = { 
            name : name,
            id : restaurant.id,
            costlevel: priceLevel,
            tags: tags,
            deliveryfee: delivery,
            rating: restaurant.review,
            address: address,
            phoneNumber : phone,
            website: website,
            emailAddress: email,
            openinghours: [`2016-06-22T${hoursOpen}:${minutesOpen}:00.000Z`, `2016-06-23T${hoursClose}:${minutesClose}:00.000Z`],
        }

        let token = localStorage.getItem('token26')
        let payload = { 
            token: token,
            restaurantName : name,
            costlevel: costLevel,
            rating: restaurant.review,
            tags: tags,
            deliveryFee: delivery,
            address: address,
            phoneNumber : phone,
            website: website,
            emailAddress: email,
            openingHours: [`2016-06-22T${hoursOpen}:${minutesOpen}:00.000Z`, `2016-06-23T${hoursClose}:${minutesClose}:00.000Z`],
        }

        console.log(payload)

        localStorage.setItem('openRestaurant', JSON.stringify(localSave))
        axios.put(`https://webproject26.herokuapp.com/restaurants/${ restaurant.id }`, payload )
        .then( (res) => {
            window.location.reload()
            console.log(res)
            })
        .catch( err => console.log(err))
        editSave()        
    }

    let output = <form className = { styles.editContainer } onSubmit = { saveInfo }> 
                    <div className = { styles.separateEdits }>
                        Restaurant name:
                        <input name = 'name' className = { styles.inputField } defaultValue = {restaurant.name}></input>
                        Restaurant address:
                        <input name = 'address' className = { styles.inputField } defaultValue = {restaurant.address}></input>
                        Email address:
                        <input name = 'email' className = { styles.inputField } defaultValue = {restaurant.emailAddress }></input>
                    </div>
                    <div className = { styles.separateEdits }>
                        Restaurant Webpage:
                        <input name = 'website' className = { styles.inputField } defaultValue = {restaurant.website}></input>
                        <div className = { styles.hoursPrice }>
                            <div className = { styles.hours }>
                                Opening hours:
                                    <div className = { styles.hoursContainer }>
                                    <input name = 'hoursOpen' type = 'number'/* min = '0' max = '23' */className = { styles.inputFieldHours } defaultValue = {restaurant.openinghours[0].slice(11, 13)} onChange = { openHourField }></input>:
                                    <input name = 'minutesOpen' type = 'number'/* min = '0' max = '59'*/ className = { styles.inputFieldHours } defaultValue = {restaurant.openinghours[0].slice(14, 16)} onChange = { openMinutesField }></input>
                                    to
                                    <input name ='hoursClose' type = 'number'/* min = '0' max = '23' */className = { styles.inputFieldHours } defaultValue = {restaurant.openinghours[1].slice(11, 13)} onChange = { closeHourField }></input>:
                                    <input name ='minutesClose' type = 'number'/* min = '0' max = '59' */className = { styles.inputFieldHours } defaultValue = {restaurant.openinghours[1].slice(14, 16)} onChange = { closeMinutesField }></input>
                                </div>
                            </div>
                            <div className = { styles.priceLevel }>
                                Price level:
                                <div className = { styles.price }>
                                    { priceArray.map( ( level, index ) => <label key = {index} >{index + 1}<input key = {index} type = "checkbox" checked = { index !== priceLevel - 1 ? false : true } onChange = { () => { chooseLevel(index) }}/></label>)}
                                </div>
                            </div>
                        </div>
                        Phone number:
                        <input name = 'phone' className = { styles.inputField } defaultValue = {restaurant.phoneNumber} type='number'></input>
                    </div>
                    <div className = { styles.separateEdits }>
                        Tags: Separate with comma!
                        <input name = 'tags' className = { styles.inputField } defaultValue = {restaurant.tags.map(tag => tag)}></input>
                        Delivery fee:
                        <input name = 'delivery' type = 'number' className = { styles.inputField } defaultValue = {restaurant.deliveryfee}></input>
                        <button type = 'submit' className = { styles.saveChanges } >Save changes</button>
                    </div>
                </form>

    let output2 = <div className = { styles.editContainer }> 
                    <div className = { styles.separateEdits }>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Restaurant name:</span>
                            <span className = { styles.fieldValue }>{restaurant.name}</span>
                            <span className = { styles.fieldName }>Restaurant address:</span>
                            <span className = { styles.fieldValue }>{restaurant.address}</span>
                            <span className = { styles.fieldName }>Email address:</span>
                            <span className = { styles.fieldValue }>{restaurant.emailAddress}</span>
                        </div>
                    </div>
                    <div className = { styles.separateEdits }>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Restaurant Webpage:</span>
                            <span className = { styles.fieldValue }>{restaurant.website}</span>
                        </div>
                        <div className = { styles.info }>
                            <div className = { styles.hoursPrice }>
                                <div className = { styles.hours }>
                                    <span className = { styles.fieldName }>Opening hours:</span>
                                    <span className = { styles.fieldValue }>{restaurant.openinghours[0].slice(11, 13)}:{restaurant.openinghours[0].slice(14, 16)} to {restaurant.openinghours[1].slice(11, 13)}:{restaurant.openinghours[1].slice(14, 16)}</span>
                                </div>
                                <div className = { styles.priceLevels }>
                                    <span className = { styles.fieldName }>Price level:</span>
                                    <span className = { styles.fieldValue }>{restaurant.costlevel}</span>
                                </div>
                            </div>
                        </div>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Phone number:</span>
                            <span className = { styles.fieldValue }>{restaurant.phoneNumber}</span>
                        </div>
                    </div>
                    <div className = { styles.separateEdits }>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Tags:</span>
                            <span className = { styles.fieldValue }>{restaurant.tags.map(tag => ' ' + tag)} </span>
                            <span className = { styles.fieldName }>Delivery fee:</span>
                            <span className = { styles.fieldValue }>${restaurant.deliveryfee}</span>
                            <button className = { styles.saveChanges } onClick = { editSave } >Edit info</button>
                        </div>
                    </div>
                </div>
    return (
        <> { edit? output : output2 } </>
    );
}

export default RestaurantInfo;
