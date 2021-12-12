import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

function Header(props) {



    return (
        <div className={styles.headerContainer}>
            <div className={styles.homeLogo}>
            <Link to = '/' className={styles.logo}><span>ORDER26</span></Link>
            <Link to = '/'><button className={styles.homeButton}>Home</button></Link>
            </div>
            <div className={styles.buttonsContainer}>
                { !props.user ? 
                      <>
                        <button className = {styles.button} onClick = { props.login }>Login</button> <button className = { styles.button } onClick = { props.register }>Register</button>
                      </> :
                            props.user.ismanager ?
                                <>
                                    <Link to = '/restaurants'><button className={ styles.button }>My restaurants</button></Link>
                                    <Link to = '/orders'><button className={ styles.button }>Orders</button></Link>
                                    <button className={styles.button} onClick = { props.logout }>Logout</button> 
                                </> :
                                      <button className={styles.button} onClick = { props.logout }>Logout</button>
                }
            </div>
        </div>
    )
}

export default Header
