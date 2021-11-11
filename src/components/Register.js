import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css'
import {registerValidation} from './validation'

const Register = ({ view = Boolean, regClick = f => f, logClick = f => f }) => {
    //changing the horizontal position of the register window, based on the state in App.js
    const [ padding, setPadding ] = useState('')
    let leftPosition
    view? leftPosition = '50%' : leftPosition = '-20%'
    const leftStyle = {left: leftPosition, paddingBottom: padding }

    //hooks handling the register input fields
    const [ email, setEmail ] = useState('')
    const emailField = (event) => {
        setEmail(event.target.value)
    }

    const [ password, setPassword ] = useState('')
    const passwordField = (event) => {
        setPassword(event.target.value)
    }

    const [ repeatPassword, setRepeatPassword ] = useState('')
    const repeatPasswordField = (event) => {
        setRepeatPassword(event.target.value)
    }

    const [ firstName, setFirstName ] = useState('')
    const firstNameField = (event) => {
        setFirstName(event.target.value)
    }

    const [ lastName, setLastName ] = useState('')
    const lastNameField = (event) => {
        setLastName(event.target.value)
    }

    const [ address, setAddress ] = useState('')
    const addressField = (event) => {
        setAddress(event.target.value)
    }

    const [ city, setCity ] = useState('')
    const cityField = (event) => {
        setCity(event.target.value)
    }

    const [ zip, setZip ] = useState('')
    const zipField = (event) => {
        setZip(event.target.value)
    }

    const [ checkBox, setCheckBox ] = useState(false)
    const checkBoxBoolean = () => {
        setCheckBox(!checkBox)
    }

    //variables for border colors
    let errorBorder = { borderColor: '#970c11' }
    let normalBorder = { borderColor: '#3b7080' }

    //array with possible error messages and hooks to change between them
    const errorsArray = ['That email is registered', 'Passwords do not match', 'Invalid Credentials']
    const [ error, setError ] = useState(errorsArray[2])

    //functions for showing and hiding the error messages
    function errorDisplay() {
        setPadding('3%')
            setTimeout( () => {
                setDisplayError(showError)
                setTimeout( () => {
                    setDisplayError({opacity: 1})
                }, 100)
            }, 750)
    }
    function errorHide() {
        setDisplayError({opacity: 0})
                setTimeout( () => {
                    setDisplayError(hideError)
                    setTimeout( () => {
                        setPadding('1%')
                    }, 100)
                }, 730)
    }

    //this is called when the email field is out of focus... it checks if the entered email is already in DB and displays an error
    function userExists() {
        axios.get(`https://webproject26.herokuapp.com/register/${email}`)
        .then( function(res) {
            if (res.data) {
            setEmailBorderColor(errorBorder)
            setError(errorsArray[0])
            errorDisplay()
            } else {
                errorHide()
                setEmailBorderColor(normalBorder)
            }
        })
    }
    
    //Checks the repeated password for a match with the password
    function matchPassword() {
        if (password !== repeatPassword) {
            setError(errorsArray[1])
            errorDisplay()
            setRepeatPasswordBorderColor(errorBorder)
        } else {
            errorHide()
            setRepeatPasswordBorderColor(normalBorder)
        }
    }

    //hooks for changing the border of the fields based on valid input
    const [ emailBorderColor, setEmailBorderColor ] = useState(normalBorder)
    const [ passwordBorderColor, setPasswordBorderColor ] = useState(normalBorder)
    const [ repeatPasswordBorderColor, setRepeatPasswordBorderColor ] = useState(normalBorder)
    const [ firstNameBorderColor, setFirstNameBorderColor ] = useState(normalBorder)
    const [ lastNameBorderColor, setLastNameBorderColor ] = useState(normalBorder)
    const [ addressBorderColor, setAddressBorderColor ] = useState(normalBorder)
    const [ cityBorderColor, setCityBorderColor ] = useState(normalBorder)
    const [ zipBorderColor, setZipBorderColor ] = useState(normalBorder)

    //hooks for displaying the error message
    let showError = { display : 'block' }
    let hideError = { display : 'none' }
    const [ displayError, setDisplayError ] = useState( hideError )

    //hooks for setting the size of the login button when clicked
    let normalLoginButton = 1
    let clickedLoginButton = 0.95
    const [ loginButtonSize, setLoginButtonSize] = useState({ transform : `scale(${normalLoginButton})` })
    const loginClick = () => {
        setLoginButtonSize({ transform: `scale(${clickedLoginButton})` })
        setTimeout( () => {
            setLoginButtonSize({ transform: `scale(${normalLoginButton})` })
        }, 50)
        setTimeout( () => {
            logClick()
        }, 250)
    }

    //Hooks for setting the size of the button when clicked and the register function itself
    let normalRegisterButton = 1
    let clickedRegisterButton = 0.95
    const [ registerButtonSize, setRegisterButtonSize] = useState({ transform : `scale(${normalRegisterButton})` })
    const register = () => {
        setRegisterButtonSize({ transform : `scale(${clickedRegisterButton})` })
        setTimeout( () => {
            setRegisterButtonSize({ transform : `scale(${normalRegisterButton})` })
        }, 50)
        let payload = {
            email : email,
            firstName : firstName,
            lastName : lastName,
            password : password,
            address : address,
            city : city,
            zip : zip,
            ismanager : checkBox
        }
        //registerValidation is imported function, it checks all input fields and returns an array with Boolean values
        let validationArray = registerValidation(email, password, repeatPassword, firstName, lastName, address, city, zip)
        
        //allvalid is a Boolean and if true, the input data will be sent using axios POST
        let allValid = validationArray.every( boolean => boolean === true )

        //Those statements check which input fields are valid and if they are not, changes the color of the coresponding field border
        !validationArray[0] ? setEmailBorderColor(errorBorder) : setEmailBorderColor(normalBorder)
        !validationArray[1] ? setPasswordBorderColor(errorBorder) : setPasswordBorderColor(normalBorder)
        !validationArray[2] ? setRepeatPasswordBorderColor(errorBorder) : setRepeatPasswordBorderColor(normalBorder)
        !validationArray[3] ? setFirstNameBorderColor(errorBorder) : setFirstNameBorderColor(normalBorder)
        !validationArray[4] ? setLastNameBorderColor(errorBorder) : setLastNameBorderColor(normalBorder)
        !validationArray[5] ? setAddressBorderColor(errorBorder) : setAddressBorderColor(normalBorder)
        !validationArray[6] ? setCityBorderColor(errorBorder) : setCityBorderColor(normalBorder)
        !validationArray[7] ? setZipBorderColor(errorBorder) : setZipBorderColor(normalBorder)


        
        if (allValid) {
            if ( padding === '3%' ) { //if there was an error displayed, it first hides the error message and adjust the height of the window
                errorHide()
            }
            axios.post('https://webproject26.herokuapp.com/register', payload)
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
            setTimeout( () =>{
                regClick()
            }, 1000)
        } else { //if allValid is false, the error message is displayed and the height of the window is adjusted
            setError(errorsArray[2])
            errorDisplay()
        }
    }


    return (
        <div className = {styles.frame} style = {leftStyle} >
            <input onChange = { emailField } onBlur = { userExists } style = { emailBorderColor } className = { styles.input } type="text" placeholder="your@email.com"></input>
            <input onChange = { passwordField } style = { passwordBorderColor } className = { styles.input } type="password" placeholder="Password"></input>
            <input onChange = { repeatPasswordField } onBlur = { matchPassword } style = { repeatPasswordBorderColor }  className = { styles.input } type="password" placeholder="Repeat password"></input>
            <div className = { styles.container }>
                <input onChange = { firstNameField } style = { firstNameBorderColor } className = { styles.name } type = "text" placeholder="First name"></input>
                <input onChange = { lastNameField } style = { lastNameBorderColor } className = { styles.name } type = "text" placeholder="Last name"></input>
            </div>
            <input onChange = { addressField } style = { addressBorderColor } className = { styles.input } type = "text" placeholder="Address"></input>
            <div className = { styles.container }>
                <input onChange = { cityField } style = { cityBorderColor } className = { styles.city } type = "text" placeholder="City"></input>
                <input onChange = { zipField } style = { zipBorderColor } className = { styles.zip } type = "text" placeholder="Zip code"></input>
            </div>
            <label className = { styles.label }>
            <input onChange = { checkBoxBoolean }  type ="checkbox" className = { styles.isManager }></input>
            I am a restaurant manager
            </label>
            <div className = { styles.container }>
                <button onClick={ loginClick } style = { loginButtonSize } className = { styles.login }>Login</button>
                <button onClick={ register } style = { registerButtonSize } className = { styles.register }>Register</button>
            </div>
            <p className = { styles.error } style = { displayError } >{error}</p>
        </div>
    );
};

export default Register;