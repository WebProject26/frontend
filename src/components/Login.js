import React from 'react';
import styles from 'Login.module.css'

const Login = () => {
    return (
        <div className = {styles.frame}>
            <input className={styles.input} type="text" placeholder="your@email.com"></input>
            <input className={styles.input} type="password" placeholder="password"></input>
            <div className = {styles.buttonsContainer}>
                <button className = {styles.login}>Login</button>
                <button className = {styles.register}>Register</button>
            </div>
        </div>
    );
};

export default Login;