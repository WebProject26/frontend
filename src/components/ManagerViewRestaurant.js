import React, { useState, useEffect } from 'react';
import styles from './ManagerViewRestaurant.module.css'
import RestaurantInfo from './RestaurantInfo'
import RestaurantCategory from './RestaurantCategory'
import { useParams } from 'react-router';
import axios from 'axios'
import FormData from 'form-data'

 
function ManagerViewRestaurant({ user, setOwnRestaurants, setPublicRestaurants }) {

    let { restaurantId } = useParams()

    const [ menuItems, setMenuItems ] = useState([])
    const [ openRestaurant, setOpenRestaurant ] = useState(null)
    const [ updatingInfo, setUpdatingInfo ] = useState(false)
    
    useEffect(() => {
            axios.get(`https://webproject26.herokuapp.com/restaurants/${restaurantId}`)
            .then( res => {
                setOpenRestaurant(res.data)
                setUpdatingInfo(false)
            })
            .catch( err => {})
            axios.get(`https://webproject26.herokuapp.com/menu/${restaurantId}`)
            .then( res => {
                setMenuItems(res.data)
                setUpdatingInfo(false)
            })
            .catch( (err) => {
                setMenuItems([])
            })
    }, [restaurantId, updatingInfo, user])
    
    let uniqueCategories = []
    let [newCategory, setNewCategory] = useState([])

    let categories = menuItems.map( item => item.foodcategory )
    let uniqueEntries = (value, index, self) => {
        return self.indexOf(value) === index
    }
    let filteredCategories = categories.filter(uniqueEntries)
    uniqueCategories = filteredCategories

    const addCategory = (event) => {
        event.preventDefault()
        if(event.target.categoryName.value === '') {
            alert('please input category name')
        } else {
            setNewCategory([...newCategory, event.target.categoryName.value])
            event.target.categoryName.value = ''
        }
    }

    const [ selectedFile, setSelectedFile] = useState(null)

    const imgUpload = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("img", selectedFile);
        axios.post('https://webproject26.herokuapp.com/upload', formData, { headers : {"Content-Type": "multipart/form-data"} }  )
        .then(res => {
            let payload = { 
                token: localStorage.getItem('token26'),
                restaurantName : openRestaurant.name,
                costlevel: openRestaurant.costlevel,
                rating: openRestaurant.review,
                tags: openRestaurant.tags,
                deliveryFee: openRestaurant.deliveryfee,
                address: openRestaurant.address,
                phoneNumber : openRestaurant.phoneNumber,
                website: openRestaurant.website,
                emailAddress: openRestaurant.emailAddress,
                openingHours: openRestaurant.openinghours,
                imageURL: `https://webproject26.herokuapp.com${res.data.externalPath}`
            }
            axios.put(`https://webproject26.herokuapp.com/restaurants/${ openRestaurant.id }`, payload )
            .then( (res) => {
                let payload = { managerid : user.id }
                axios.get('https://webproject26.herokuapp.com/restaurants', { headers : payload } )
                .then( ( res ) => {
                setOwnRestaurants(res.data)
                })
                axios.get('https://webproject26.herokuapp.com/restaurants')
                .then( res => {
                    setPublicRestaurants( res.data )
                })
                setUpdatingInfo(true)
            })
            .catch( err => {})
        })
        .catch( err => {})
      }

    const handleFile = (event) => {
        event.preventDefault()
        setSelectedFile(event.target.files[0])
    }

    const [ imgForm, setImgForm ] = useState(false)
    const showImgForm = () => {
        setImgForm(true)
    }


    return (
        <div>
            <div className = { styles.testImg } style = { { backgroundImage: openRestaurant? `url(${openRestaurant.imageURL})` : ''}}><button className = { styles.selectImageButton } onClick={ showImgForm }>Select image</button></div>
            { imgForm ? <form className = { styles.imgUpload } onSubmit = { imgUpload } >
                            <input type = 'file' name = 'img' onChange = { handleFile } className = { styles.chooseFile }></input>
                            <button type = 'submit' className = { styles.uploadButton }>Upload</button>
                        </form> : null }
            <RestaurantInfo openRestaurant = { openRestaurant } updateInfo = { setUpdatingInfo } user = { user } setOwnRestaurants = { setOwnRestaurants } setPublicRestaurants = { setPublicRestaurants }/>
            { uniqueCategories.map((category, index) => <RestaurantCategory key = {index} category = { category } items = { menuItems.filter(item => item.foodcategory === category) } setNewCategory = { setNewCategory } setUpdatingInfo = { setUpdatingInfo }/>) }
            { newCategory.map( (category, index) => <RestaurantCategory key = {index} category = {category} items = { [] } setNewCategory = { setNewCategory } setUpdatingInfo = { setUpdatingInfo }/>)}
            <form className = { styles.newCategoryContainer } onSubmit = { addCategory }>
                <input type = 'text' name = 'categoryName' className = { styles.newCategory } placeholder = "Category name" ></input>
                <button className = { styles.addCategoryButton } type = 'submit'>Add category</button>
            </form>
        </div>
    );
}

export default ManagerViewRestaurant;