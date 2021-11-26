import React, { useState } from 'react';
import styles from './RestaurantInfo.module.css'
import axios from 'axios'

function RestaurantInfo(props) {

    let restaurant = JSON.parse(localStorage.getItem('openRestaurant'))
    console.log(restaurant)

    let priceArray = [1, 2, 3, 4, 5]
    const [ priceLevel, setPriceLevel ] = useState(restaurant.costlevel)
    function chooseLevel(level) {
        setPriceLevel(priceArray[level])
    }    
    
    const [ edit, setEdit ] = useState(false)

    function editSave() {
        edit? setEdit(false) : setEdit(true)
        console.log(payload)
    }

    const [ restName, setRestName ] = useState(restaurant.name)
    const nameField = ( event ) => {
        setRestName(event.target.value)
    }
    const [ restAddress, setRestAddress ] = useState(restaurant.address)
    const addressField = ( event ) => {
        setRestAddress(event.target.value)
    }
    const [ restTags, setRestTags ] = useState(restaurant.tags)
    const tagsField = ( event ) => {
        setRestTags(event.target.value)
    }
    const [ restPhone, setRestPhone ] = useState(restaurant.phoneNumber)
    const phoneField = ( event ) => {
        setRestPhone(event.target.value)
    }
    const [ restWebsite, setRestWebsite ] = useState(restaurant.website)
    const websiteField = (event) => {
        setRestWebsite(event.target.value)
    }
    const [ restEmail, setRestEmail ] = useState(restaurant.emailAddress)
    const emailField = (event) => {
        setRestEmail(event.target.value)
    }
    const [ restOpenHour, setRestOpenHour ] = useState(restaurant.openinghours[0].slice(11, 13))
    const openHourField = (event) => {
        setRestOpenHour(event.target.value)
    }
    const [ restOpenMin, setRestOpenMin ] = useState(restaurant.openinghours[0].slice(14, 16))
    const openMinField = (event) => {
        setRestOpenMin(event.target.value)
    }
    const [ restCloseHour, setRestCloseHour ] = useState(restaurant.openinghours[1].slice(11, 13))
    const closeHourField = (event) => {
        setRestCloseHour(event.target.value)
    }
    const [ restCloseMin, setRestCloseMin ] = useState(restaurant.openinghours[1].slice(14, 16))
    const closeMinField = (event) => {
        setRestCloseMin(event.target.value)
    }
    const [ deliveryFee, setDeliveryFee ] = useState(restaurant.deliveryfee)
    const deliveryField = (event) => {
        setDeliveryFee(event.target.value)
    }

    let token = localStorage.getItem('token26')
    let payload = { 
        token,
        restaurantName : restName,
        costlevel: priceLevel,
        tags: [restTags],
        deliveryFee: deliveryFee,
        address: restAddress,
        phoneNumber : restPhone,
        website: restWebsite,
        emailAddress: restEmail,
        openingHours: [`2016-06-22T${restOpenHour}:${restOpenMin}:00.000Z`, `2016-06-23T${restCloseHour}:${restCloseMin}:00.000Z`],
    }
    let localSave = { 
        name : restName,
        id : restaurant.id,
        costlevel: priceLevel,
        tags: [restTags],
        deliveryfee: deliveryFee,
        address: restAddress,
        phoneNumber : restPhone,
        website: restWebsite,
        emailAddress: restEmail,
        openinghours: [`2016-06-22T${restOpenHour}:${restOpenMin}:00.000Z`, `2016-06-23T${restCloseHour}:${restCloseMin}:00.000Z`],
    }
 
    const updateRestaurant = () => { 
        console.log(payload)
        localStorage.removeItem('openRestaurant')
        localStorage.setItem('openRestaurant', JSON.stringify(localSave))
        axios.put(`https://webproject26.herokuapp.com/restaurants/${ restaurant.id }`, payload )
        .then( (res) => {
            //window.location.reload()
            console.log(res)
            })
        .catch( err => console.log(err))
        editSave()
        
    }

    let output = <div className = { styles.editContainer }> 
                    <div className = { styles.separateEdits }>
                        Restaurant name:
                        <input className = { styles.inputField } defaultValue = {restaurant.name} onChange = { nameField }></input>
                        Restaurant address:
                        <input className = { styles.inputField } defaultValue = {restaurant.address} onChange = { addressField }></input>
                        Email address:
                        <input className = { styles.inputField } defaultValue = {restaurant.emailAddress } onChange = { emailField }></input>
                    </div>
                    <div className = { styles.separateEdits }>
                        Restaurant Webpage:
                        <input className = { styles.inputField } defaultValue = {restaurant.website} onChange = { websiteField }></input>
                        <div className = { styles.hoursPrice }>
                            <div className = { styles.hours }>
                                Opening hours:
                                    <div className = { styles.hoursContainer }>
                                    <input type = 'number' className = { styles.inputFieldHours } defaultValue = {restaurant.openinghours[0].slice(11, 13)} onChange = { openHourField }></input>:
                                    <input type = 'number' className = { styles.inputFieldHours } defaultValue = {restaurant.openinghours[0].slice(14, 16)} onChange = { openMinField }></input>
                                    to
                                    <input type = 'number' className = { styles.inputFieldHours } defaultValue = {restaurant.openinghours[1].slice(11, 13)} onChange = { closeHourField }></input>:
                                    <input type = 'number' className = { styles.inputFieldHours } defaultValue = {restaurant.openinghours[1].slice(14, 16)} onChange = { closeMinField }></input>
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
                        <input className = { styles.inputField } defaultValue = {restaurant.phoneNumber} type='number' onChange = { phoneField }></input>
                    </div>
                    <div className = { styles.separateEdits }>
                        Tags:
                        <input className = { styles.inputField } defaultValue = {restaurant.tags.map(tag => tag)} onChange={ tagsField }></input>
                        Delivery fee:
                        <input type = 'text' className = { styles.inputField } defaultValue = {restaurant.deliveryfee} onChange={ deliveryField }></input>
                        <button className = { styles.saveChanges } onClick = { updateRestaurant } >Save changes</button>
                    </div>
                </div>

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
                            <span className = { styles.fieldValue }>{restaurant.tags.map(tag => tag)}</span>
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
