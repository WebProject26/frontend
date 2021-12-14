import React, { useState } from 'react'
import styles from './FoodItemBox.module.css'
import axios from 'axios'
import { useParams } from 'react-router'
import FormData from 'form-data'

export default function FoodItemBox(props) {

    let { restaurantId } = useParams()

    const deleteItem = (id) => {
        let token = localStorage.getItem('token26')
        let payload = { 
            token: token,
            itemid: id
        }
        let confirmation = prompt('If you want to delete this item, please type - yes')
        if( confirmation === 'yes' ){
            axios.delete(`https://webproject26.herokuapp.com/menu/${restaurantId}`, { data: payload })
            .then( (res) => {
                props.updateInfo(true)
            })
            .catch( err => {
                console.log(err)
            })
        }
    }   

   
    
    const [ selectedFile, setSelectedFile] = useState(null)


    const imgUpload = (event) => {
        event.preventDefault()
        if( event.target.img.value === '') {
            let payload = { 
                token: localStorage.getItem('token26'),
                itemid: props.item.id,
                itemName: event.target.name.value,
                description: event.target.description.value,
                cost: event.target.price.value,
                foodcategory: props.item.foodcategory,
                imageURL: props.item.imageURL
            }
            axios.put(`https://webproject26.herokuapp.com/menu/${restaurantId}`, payload )
            .then( (res) => {
                props.updateInfo(true)
                editSave()
            })
            .catch(err=> {})
        } else {
            let formData = new FormData()
            formData.append("img", selectedFile)
            axios.post('https://webproject26.herokuapp.com/upload', formData, { headers : {"Content-Type": "multipart/form-data"} } )
            .then(res => {
                let payload = { 
                    token: localStorage.getItem('token26'),
                    itemid: props.item.id,
                    itemName: event.target.name.value,
                    description: event.target.description.value,
                    cost: event.target.price.value,
                    foodcategory: props.item.foodcategory,
                    imageURL: `https://webproject26.herokuapp.com${res.data.externalPath}`
                }
                axios.put(`https://webproject26.herokuapp.com/menu/${restaurantId}`, payload )
                .then( (res) => {
                    props.updateInfo(true)
                    editSave()
                })
                .catch(err=> {})
            })
            .catch(err=> {})
        }
    }

    const handleFile = (event) => {
        event.preventDefault()
        setSelectedFile(event.target.files[0])
    }

    const [ edit, setEdit ] = useState(false)

    function editSave() {
        edit? setEdit(false) : setEdit(true)
    }

    let editItem = <form className = { styles.boxContainer } onSubmit = { imgUpload }>
                        <div className = { styles.foodBox } >
                            Item name:
                            <input name = 'name' className = { styles.input } defaultValue = { props.item.name }></input>
                            Description: 
                            <input name = 'description' className = { styles.input } defaultValue = { props.item.description }></input>
                            Price:
                            <input name = 'price' className = { styles.input } defaultValue = { props.item.cost }></input>
                            <input type = 'file' name = 'img' className = { styles.chooseFile } onChange = { handleFile }></input>
                        </div>
                        <button type ='submit' className = { styles.saveButton } >Save</button>
                    </form>
    
    let savedItem = <div className = { styles.boxContainer } >
                        <div className = { styles.foodBox } style = {{ backgroundImage: `url(${props.item.imageURL})`}}/>
                        <div className = { styles.namePrice }>
                            <span className = { styles.name }>{ props.item.name }</span>
                            <span className = { styles.cost }>€{ props.item.cost }</span>
                        </div>
                        <div className = { styles.description }>
                            <span className = { styles.description }>{ props.item.description }</span>
                        </div>
                        <div className = { styles.buttonsDiv }>
                            <button className = { styles.deleteEdit } onClick = { () => deleteItem(props.item.id) }>Delete</button>
                            <button className = { styles.deleteEdit } onClick = { editSave }>Edit</button>
                        </div>
                      </div>
                      
    return (
        <>{ edit? editItem : savedItem }</>
    )
}

