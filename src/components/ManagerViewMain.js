import React, { useEffect } from 'react';
import styles from './ManagerViewMain.module.css'
import RestaurantBox from './RestaurantBox';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function ManagerViewMain({restaurants, user, setOwnRestaurants}) {

    let token = localStorage.getItem('token26')
    let navigate = useNavigate()
    
    useEffect(() => {
        if( !user || !user.ismanager ){
            navigate('/', { replace: true })
        }
    }, [user, navigate])


    const createRestaurant = () => {
        let payload = {   
            token: token,
            restaurantName: "Click to edit",
            rating: Math.floor(Math.random() * 50),
            costlevel: 1,
            tags: [],
            imageURL: "https://i.redd.it/x1a1thbc8us71.jpg",
            deliveryFee: 5,
            address: "Your address",
            phoneNumber: 1234567890,
            website:"yourWebPage.com",
            emailAddress:"your@email.com",
            openingHours:[
                "2016-06-22 00:00:00-00",
                "2016-06-22 00:00:00-00"
            ]
        }
        axios.post('https://webproject26.herokuapp.com/restaurants', payload)
        .then( (res) => {
            let payload = { managerid : user.id }
            axios.get('https://webproject26.herokuapp.com/restaurants', { headers : payload } )
            .then( ( res ) => {
                setOwnRestaurants(res.data)
            })
        })
        .catch(err => {})
    }

    const deleteRestaurant = ( restaurantId ) => {
        let payload = { token: token }
        let confirmation = prompt('If you want to delete this restaurant, please type - yes')
        if( confirmation === 'yes' ){
            axios.delete(`https://webproject26.herokuapp.com/restaurants/${restaurantId}`, { data: payload } )
            .then( (res) => {
                let payload = { managerid : user.id }
                axios.get('https://webproject26.herokuapp.com/restaurants', { headers : payload } )
                .then( ( res ) => {
                    setOwnRestaurants(res.data)
                })
            })
            .catch( err => {})
        }
    }

    return (
        <div className = { styles.mainContainer }>
            { restaurants.map( (restaurant, index) => <div className = { styles.linkContainer } key = { index }>
                                                        <Link to = {restaurant.id} className = { styles.link } key = { index } >
                                                        <RestaurantBox key = { index } restaurant = { {...restaurant} }/></Link>
                                                        <button className = { styles.deleteButton } key = { index + 1 } onClick = { () => deleteRestaurant(restaurant.id) }>delete</button>
                                                      </div>) }
            <div className = { styles.addRestaurant } onClick = { createRestaurant }>+</div>
        </div>
    );
}

export default ManagerViewMain;
