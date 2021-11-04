import React from 'react'
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className ={styles.headBackground}>
            <div className ={styles.headContainer}>
                <div classname ={styles.headLogo}>Order26</div>
                <div className ={styles.headerbothButtonstyle}>
                    <button>Register</button>
                    <button>Login</button>
                </div>
            </div>
        </div>
    )
}
