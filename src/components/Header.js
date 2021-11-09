import React from 'react'
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className ={styles.headBackground}>
            <div className ={styles.headContainer}>
                <div className ={styles.headLogo}>Order26</div>
                <div>
                    <button className={styles.headB1}>Register</button>
                    <button className={styles.headB2}>Login</button>
                </div>
            </div>
        </div>
    )
}
