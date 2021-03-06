import React, { useState } from 'react';
import styles from './Login.module.css'
import axios from 'axios'
import { loginValidation } from './validation'

const Login = ({ view = Boolean,
                 loginClick = f => f,
                 regClick = f => f,
                 setUser = f => f,
                 setOwnRestaurants = f => f,
                 setUsers = f => f 
}) => {

    //changing the vertical position of the login window, based on the state in App.js
    //height is changed if there is an error on display
    const [ padding, setPadding ] = useState('')
    let topPosition
    view? topPosition = '20%' : topPosition = '-50%'
    let topStyle = {top: topPosition, paddingBottom: padding }

    //variables for border colors
    let errorBorder = { borderColor: '#970c11' }
    let normalBorder = { borderColor: '#3b7080' }

    function errorDisplay() {
        setPadding('1%')
            setTimeout( () => {
                setDisplayError(showError)
                setTimeout( () => {
                    setDisplayError({opacity: 1})
                }, 100)
            }, 730)
    }
    function errorHide() {
        setDisplayError({opacity: 0})
            setTimeout( () => {
                setDisplayError(hideError)
                setTimeout( () => {
                    setPadding('0%')
                }, 100)
            }, 730)
    }

    //hooks for changing the border of the fields based on valid input
    const [ emailBorderColor, setEmailBorderColor ] = useState(normalBorder)
    const [ passwordBorderColor, setPasswordBorderColor ] = useState(normalBorder)

    //hooks for changing the visibilty of the error
    let showError = { display : 'block' }
    let hideError = { display : 'none' }
    const [ displayError, setDisplayError ] = useState( hideError )

    //hooks for setting the size of the register button when clicked
    let normalRegisterButton = 1
    let clickedRegisterButton = 0.95
    const [ registerButtonSize, setRegisterButtonSize] = useState({ transform : `scale(${normalRegisterButton})` })
    const registerClick = (event) => {
        event.preventDefault()
        setRegisterButtonSize({ transform: `scale(${clickedRegisterButton})` })
        setTimeout( () => {
            setRegisterButtonSize({ transform: `scale(${normalRegisterButton})` })
        }, 50)
        setTimeout( () => {
            regClick()
        }, 250)
    }

    //Hooks for setting the size of the button when clicked and the login function itself
    let normalLoginButton = 1
    let clickedLoginButton = 0.95
    const [ loginButtonSize, setLoginButtonSize ] = useState({ transform : `scale(${normalLoginButton})` })

    const login = (event) => {
        event.preventDefault()
        let email = event.target.email.value
        let password = event.target.password.value
        setLoginButtonSize({ transform : `scale(${clickedLoginButton})` })
        setTimeout( () => {
            setLoginButtonSize({ transform : `scale(${normalLoginButton})` })
        }, 50)
        let payload = {
            email : email,
            password : password
        }
        //loginValidation is imported function, it checks all input fields and returns an array with Boolean values
        let validationArray = loginValidation( email, password )

        //allvalid is a Boolean and if true, the input data will be sent using axios PUT
        let allValid = validationArray.every( boolean => boolean === true )

        //hooks for changing the border of the fields based on valid input
        !validationArray[0] ? setEmailBorderColor(errorBorder) : setEmailBorderColor(normalBorder)
        !validationArray[1] ? setPasswordBorderColor(errorBorder) : setPasswordBorderColor(normalBorder)
        
        if (allValid) {
            axios.put('https://webproject26.herokuapp.com/login', payload)
            .then((res) => {
                localStorage.setItem('token26', res.data.token)
                setUser(res.data)
                errorHide()
                if(res.data.ismanager) {
                    let payload = { managerid : res.data.id }
                    axios.get('https://webproject26.herokuapp.com/restaurants', { headers : payload } )
                    .then( res => setOwnRestaurants(res.data) )
                    .catch( err => {} )
                    axios.get('https://webproject26.herokuapp.com/register')
                        .then( res => {
                        setUsers( res.data )
                        })
                        .catch( err => {} )
                }
                setTimeout( () =>{
                    loginClick()
                 }, padding === '1%' ? 1500 : 1000 )
            })
            .catch((error) => {
                errorDisplay()
            })
        } else { //if allValid is false, the error message is displayed and the height of the window is adjusted
            errorDisplay()
        }
    }

    const closeForm = (event) => {
        event.preventDefault()
        loginClick()
    }

    return (
        <form className = {styles.frame} style = {topStyle} onSubmit = { login }>
            <button onClick = { closeForm } className = { styles.closeButton }>&times;</button>
            <input name = 'email' style = { emailBorderColor } className = {styles.input} type="text" placeholder="your@email.com"></input>
            <input name = 'password' style = { passwordBorderColor } className = {styles.input} type="password" placeholder="password"></input>
            <div className = {styles.buttonsContainer}>
                <button type = 'submit' style = { loginButtonSize } className = {styles.login}>Login</button>
                <button onClick = { registerClick } style = { registerButtonSize } className = {styles.register}>Register</button>
            </div>
            <p className = {styles.error} style = { displayError } >Invalid credentials</p>
        </form>
    );
};

export default Login;