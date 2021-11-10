import { sliderUnstyledClasses } from '@mui/core';
import React from 'react'
import styles from './Header.module.css';

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.state = {
        loggedoffb1 : [styles.loggedOffB1],
        loggedoffb2 : [styles.loggedOffB2],
        isLoggedIn : false,
        loggedinb1 : [styles.loggedInB1],
        loggedinb2 : [styles.loggedInB2],
       
         };
     }

     handleLoginClick(){
         this.setState({isLoggedIn:true});
     }

     render(){
        const isLoggedIn = this.state.isLoggedIn;
        return (
<div>
      {isLoggedIn ? (
    <div className ={styles.headBackground}>
        <div className ={styles.headContainer}>
            <div className ={styles.headLogo}>Order26</div>
            <div className={styles.testname}>
                 <button className={this.state.loggedinb1}>Cart</button>
                 <button className={this.state.loggedinb2}>User</button>
            </div>
        </div>
    </div>
            ) : (
    <div className ={styles.headBackground}>
        <div className ={styles.headContainer}>
            <div className ={styles.headLogo}>Order26</div>
                <div className={styles.testname}>
                    <button className={this.state.loggedoffb1}>Register</button>
                    <button  className={this.state.loggedoffb2}>Login</button>
                </div>
        </div>
    </div> 
            )}
</div>
        );

 }
}   
  

  
  export {Header};
