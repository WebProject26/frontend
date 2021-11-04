import React from 'react';
import styles from './Login.module.css'

const Login = ({ view = Boolean, loginClick = f => f, regClick = f => f }) => {
    let topPosition
    if (view) {
        topPosition = '20%'
    } else {
        topPosition = '-50%'
    }
    const topStyle = {top: topPosition }
    return (
        <div className = {styles.frame} style = {topStyle} >
            <input className = {styles.input} type="text" placeholder="your@email.com"></input>
            <input className = {styles.input} type="password" placeholder="password"></input>
            <div className = {styles.buttonsContainer}>
                <button onClick={ () => loginClick() } className = {styles.login}>Login</button>
                <button onClick={ () => regClick() } className = {styles.register}>Register</button>
            </div>
            <p className = {styles.error}>Invalid credentials</p>
        </div>
    );
};

export default Login;