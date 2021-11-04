import React from 'react';
import styles from './Register.module.css'

const Register = ({ view = Boolean, regClick = f => f, loginClick = f => f }) => {
    let leftPosition
    if (view) {
        leftPosition = '50%'
    } else {
        leftPosition = '-20%'
    }
    const leftStyle = {left: leftPosition }
    return (
        <div className = {styles.frame} style = {leftStyle} >
            <input className = {styles.input} type="text" placeholder="your@email.com"></input>
            <input className = {styles.input} type="password" placeholder="Password"></input>
            <input className = {styles.input} type="password" placeholder="Repeat password"></input>
            <div className = {styles.container}>
                <input className = {styles.name} type = "text" placeholder="First name"></input>
                <input className = {styles.name} type = "text" placeholder="Last name"></input>
            </div>
            <input className = {styles.input} type = "text" placeholder="Address"></input>
            <div className = {styles.container}>
                <input className = {styles.city} type = "text" placeholder="City"></input>
                <input className = {styles.zip} type = "text" placeholder="Zip code"></input>
            </div>
            <label className = { styles.label}>
            <input type ="checkbox" className = {styles.isManager} label = "I am a manager"></input>
            I am a restaurant manager
            </label>
            <div className = {styles.container}>
                <button onClick={ () => loginClick() } className = {styles.login}>Login</button>
                <button onClick={ () => regClick() } className = {styles.register}>Register</button>
            </div>
            <p className = {styles.error}>Invalid credentials</p>
        </div>
    );
};

export default Register;