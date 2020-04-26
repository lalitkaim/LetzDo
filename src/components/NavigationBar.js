import React, { Component } from 'react'
import classes from './NavigationBar.module.css'
import { NavLink } from 'react-router-dom';
import {initialize} from './Config'
import { connect } from 'react-redux';




class NavigationBar extends Component{

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("mySidenavouter").style.width = "100%";
    }
      
    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("mySidenavouter").style.width = "0%";
    
    }
    
    logout=()=>{
        localStorage.removeItem('user')
        initialize.auth().signOut()
        window.location.reload()
        window.location.href ='/' 
    }



    render(){
        const nav= (
            <div>
                <div id="mySidenav" className={classes.sidenav}>
                    <label  className={classes.closebtn} onClick={this.closeNav}>&times;</label>
                    <NavLink to="/">Home</NavLink>
                    <a onClick={this.logout}>Logout</a>
                </div>
                <div onClick={this.closeNav} className={classes.sidenavouter} id="mySidenavouter">
                </div>
            </div>
        )

        return (
            <div className="container-fluid">
                <div className="row" style={{margin:'0'}}>
                    <span className={classes.navLogo} style={{fontSize:'25px',cursor:'pointer'}} onClick={this.openNav}>&#9776;</span>
                    <h4 className={classes.title}>LetzDo</h4>
                    <hr/>
                    {nav}
                </div>
            </div>
        )
    }
    
}

export default NavigationBar
