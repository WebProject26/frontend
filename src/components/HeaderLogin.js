import React from 'react'
import styles from './HeaderLogin.module.css'

export default function HeaderLogin() {
    return (
        <div>
            <div className ={styles.headBackground}>
            <div className ={styles.headContainer}>
                <div className ={styles.headLogo}>Order26</div>
                <div>
                    <button className={styles.headB1}>Cart</button>
                    <button className={styles.headB2}>User</button>
                </div>
            </div>
        </div>
        </div>
    )
}

