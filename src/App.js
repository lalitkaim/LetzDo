import React, { Component } from 'react';
import NavigationBar from './components/NavigationBar'
import {Redirect, Route, Switch } from 'react-router-dom';
import Upcoming from './components/Upcoming';
import Login from './components/Login';
import {initialize} from "./components/Config";
import PageNotFound from './components/PageNotFound';
import TermCondition from './components/TermCondition';
import forgotPassword from './components/forgotPassword';
import classes from './components/ToDoListContainer.module.css'


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       user:null,
       isLoaded:false
    }
  }
  


  componentDidMount(){
    this.authListener();
  }

  authListener=()=>{
    initialize.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user:user, isLoaded:true})
      }
      else{
        this.setState({user:null, isLoaded:true})
      }
    })
  }



  render(){
    let afterAuth = null

    if(!this.state.isLoaded)
    {
      return <div style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
        <div className={classes.loader}>Loadin...</div>
      </div>
    }
    else{
      if(this.state.user){
        afterAuth =(
            <React.Fragment>
              <NavigationBar/>
              <Switch>
                <Route path="/" component={Upcoming}/>
                <Route path="*" exact component={PageNotFound}/>
              </Switch>
            </React.Fragment>
        )
      }
      else{
        afterAuth =(
            <Switch>
              <Route path="/" exact component={Login}/>
              <Route path="/terms-conditions" component={TermCondition}/>
              <Route path="/forgot-password" component={forgotPassword}/>
              <Route path="*" exact component={PageNotFound}/>
            </Switch>
        )
      }
    }
    return (
      <React.Fragment>
        {afterAuth}
      </React.Fragment>
    )
  }
  
}

export default App;
