
import {useState,useEffect} from 'react'
import styles from '../Styles/Navbar.module.css'


export function Nav(){

    return(

  <>
  
  <div className={styles.Nav_wrapper}>

  <h1>Logo</h1>

  <div className={styles.Links}>

  <ul>
  <li>About</li>
  <li>Pricing</li>
  <li>Demos</li>
  <li>How It Works</li>

  </ul>
  </div>

  <div className={styles.btn_wrapper}>

 <button>Settings</button>
 
  </div>

  </div>


  </>


    )





}

