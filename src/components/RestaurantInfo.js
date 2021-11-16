import React, { useState } from 'react';
import styles from './RestaurantInfo.module.css'

function RestaurantInfo(props) {

    let priceArray = [1, 2, 3, 4, 5]
    const [ priceLevel, setPriceLevel ] = useState(priceArray[0])
    function chooseLevel(level) {
        setPriceLevel(priceArray[level])
    }    
    
    let data = {
        name: "pizza",
        address: "tiilite 7",
        email: "test@test.com",
        webpage:  "www.pizza.com",
        hours: "8am-23pm",
        price: priceLevel,
        phone: "0449574092",
        tags: "piiza, burger, kebap",
        delivery: "6"

    }
    const [ edit, setEdit ] = useState(false)

    function editSave() {
        edit? setEdit(false) : setEdit(true)
    }

    let output = <div className = { styles.editContainer }> 
                    <div className = { styles.separateEdits }>
                        Restaurant name:
                        <input className = { styles.inputField } defaultValue = { data.name }></input>
                        Restaurant address:
                        <input className = { styles.inputField }></input>
                        Email address:
                        <input className = { styles.inputField }></input>
                    </div>
                    <div className = { styles.separateEdits }>
                        Restaurant Webpage:
                        <input className = { styles.inputField }></input>
                        <div className = { styles.hoursPrice }>
                            <div className = { styles.hours }>
                                Opening hours:
                                <input className = { styles.inputFieldHours }></input>
                            </div>
                            <div className = { styles.priceLevel }>
                                Price level:
                                <div className = { styles.price }>
                                    { priceArray.map( ( level, index ) => <label key = {index} >{index + 1}<input key = {index} type = "checkbox" checked = { index !== priceLevel - 1 ? false : true } onChange = { () => { chooseLevel(index) }}/></label>)}
                                </div>
                            </div>
                        </div>
                        Phone number:
                        <input className = { styles.inputField }></input>
                    </div>
                    <div className = { styles.separateEdits }>
                        Tags:
                        <input className = { styles.inputField }></input>
                        Delivery fee:
                        <input className = { styles.inputField }></input>
                        <button className = { styles.saveChanges } onClick = { editSave } >Save changes</button>
                    </div>
                </div>

    let output2 = <div className = { styles.editContainer }> 
                    <div className = { styles.separateEdits }>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Restaurant name:</span>
                            <span className = { styles.fieldValue }>{data.name}</span>
                            <span className = { styles.fieldName }>Restaurant address:</span>
                            <span className = { styles.fieldValue }>{data.address}</span>
                            <span className = { styles.fieldName }>Email address:</span>
                            <span className = { styles.fieldValue }>{data.email}</span>
                        </div>
                    </div>
                    <div className = { styles.separateEdits }>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Restaurant Webpage:</span>
                            <span className = { styles.fieldValue }>{data.webpage}</span>
                        </div>
                        <div className = { styles.info }>
                            <div className = { styles.hoursPrice }>
                                <div className = { styles.hours }>
                                    <span className = { styles.fieldName }>Opening hours:</span>
                                    <span className = { styles.fieldValue }>{data.hours}</span>
                                </div>
                                <div className = { styles.priceLevels }>
                                    <span className = { styles.fieldName }>Price level:</span>
                                    <span className = { styles.fieldValue }>{data.price}</span>
                                </div>
                            </div>
                        </div>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Phone number:</span>
                            <span className = { styles.fieldValue }>{data.phone}</span>
                        </div>
                    </div>
                    <div className = { styles.separateEdits }>
                        <div className = { styles.info }>
                            <span className = { styles.fieldName }>Tags:</span>
                            <span className = { styles.fieldValue }>{data.tags}</span>
                            <span className = { styles.fieldName }>Delivery fee:</span>
                            <span className = { styles.fieldValue }>${data.delivery}</span>
                            <button className = { styles.saveChanges } onClick = { editSave } >Edit info</button>
                        </div>
                    </div>
                </div>
    return (
        <> { edit? output : output2 } </>
    );
}

export default RestaurantInfo;