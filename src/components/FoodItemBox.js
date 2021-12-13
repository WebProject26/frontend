import React, { useState } from 'react'
import styles from './FoodItemBox.module.css'
import axios from 'axios'
import { useParams } from 'react-router'

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
                console.log(res)
                props.updateInfo(true)
            })
            .catch( err => {
                console.log(err)
            })
        }
    }   

   
    /*
     const [ selectedFile, setSelectedFile] = useState(null)
    const handleFile = (event) => {
        event.preventDefault()
        setSelectedFile(event.target.files[0])
        console.log(selectedFile)
    }
    const saveEdit = (event) => {
        event.preventDefault()
        let token = localStorage.getItem('token26')
        const formData = new FormData();
        formData.append("img", selectedFile);
        console.log(formData)
        axios.post('https://webproject26.herokuapp.com/upload', formData, { headers : {"Content-Type": "multipart/form-data"} }  )
        .then(res => {
            console.log(res.data.externalPath)
            let payload = { 
                token: token,
                itemid: props.item.id,
                itemName: event.target.name.value,
                description: event.target.description.value,
                cost: event.target.price.value,
                foodcategory: props.item.foodcategory,
                imageURL: `https://webproject26.herokuapp.com${res.data.externalPath}`
            }
            axios.put(`https://webproject26.herokuapp.com/menu/${restaurantId}`, payload )
            .then( (res) => {
                console.log(res)
                props.updateInfo(true)
                setOutput(savedItem)
            })
            .catch(err=> console.log(err))
        })
        .catch(err=> console.log(err))
        <input type = 'file' name = 'img' onChange = { handleFile } className = { styles.chooseFile }></input>
    }*/
    const saveEdit = (event) => {
        event.preventDefault()
        let token = localStorage.getItem('token26')
        let payload = { 
            token: token,
            itemid: props.item.id,
            itemName: event.target.name.value,
            description: event.target.description.value,
            cost: event.target.price.value,
            foodcategory: props.item.foodcategory
        }
        axios.put(`https://webproject26.herokuapp.com/menu/${restaurantId}`, payload )
        .then( (res) => {
            console.log(res)
            props.updateInfo(true)
            setOutput(savedItem)
        })
        .catch(err=> console.log(err))
    }



    const editItem = <form className = { styles.boxContainer } onSubmit = { saveEdit }>
                        <div className = { styles.foodBox } >
                            Item name:
                            <input name = 'name' className = { styles.input } defaultValue = { props.item.name }></input>
                            Description: 
                            <input name = 'description' className = { styles.input } defaultValue = { props.item.description }></input>
                            Price:
                            <input name = 'price' className = { styles.input } defaultValue = { props.item.cost }></input>
                        </div>
                        <button type ='submit' className = { styles.saveButton } >Save</button>
                    </form>
    
    const savedItem = <div className = { styles.boxContainer } >
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
                            <button className = { styles.deleteEdit } onClick = { () =>  setOutput( editItem ) }>Edit</button>
                        </div>
                      </div>

    const [ output, setOutput ] = useState(savedItem)

    return (
        <>{ output }</>
    )
}

