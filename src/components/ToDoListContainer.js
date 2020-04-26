import React, { Component } from 'react'
import firebase from "firebase";
import {initialize} from './Config'
import classes from './ToDoListContainer.module.css';

const tododiv= {
    border:'1px solid #ccc',
    padding:'6px',
    paddingTop:'11px',
    marginBottom : '5px'
}

const style ={
    fontSize:'20px'
}

const todolistcontainer= {
    textAlign:'left',
    marginBottom:'120px'
}

const deletebutton= {
    float:'right',
    color:'#e87654',
    cursor:'pointer'
}


class ToDoListContainer extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
             Conttodo:  [],
             date:this.props.date,
             isLoaded:false
        }
    }

    sample = (index) => {
        let temp=[]
        const db = initialize.database();
        const Drefr = initialize.database().ref('letzdo/'+initialize.auth().currentUser.uid+'/'+this.state.date);
        Drefr.once('value',snapshot => {
            temp=[...snapshot.val().todoRoot]
            temp.splice(index,1)
            this.setState({Conttodo:temp})
        })
        db.ref("letzdo/"+initialize.auth().currentUser.uid+'/'+this.state.date).set({
            todoRoot:temp
        })
    }

    componentDidMount(){
        initialize.auth().onAuthStateChanged(user=>{
            if(user){
                const refr = firebase.database().ref('letzdo/'+user.uid+'/'+this.state.date);
                refr.on('value',snapshot => {
                    if(snapshot.val()){
                           this.setState({Conttodo:[...snapshot.val().todoRoot], isLoaded:true})
                    }
                    else{
                        this.setState({Conttodo:[], isLoaded:true})
                    }
                });
            }
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.date !== this.props.date) {
          this.setState({date: this.props.date});
          initialize.auth().onAuthStateChanged(user=>{
            if(user){
                const refr = firebase.database().ref('letzdo/'+user.uid+'/'+this.state.date);
                refr.on('value',snapshot => {
                    if(snapshot.val()){
                        this.setState({Conttodo:[...snapshot.val().todoRoot], isLoaded:true})
                    }
                    else{
                        this.setState({Conttodo:[], isLoaded:true})
                    }
                });
            }
        })
        }
      }

    render(){
        return (
            <div style={todolistcontainer}>
                {
                    !this.state.isLoaded ?
                    <div className={classes.loader}>Loading...</div> :
                    this.state.Conttodo.length ?
                    this.state.Conttodo.map((todo, index )=> {
                        return (
                            <div key={index} style={tododiv} className="row animated fadeInUp">
                                <div className="col l11 m11 s11">
                                    <label>
                                        <span style={style}>{todo.text}</span>
                                    </label>
                                </div>
                                <div className="col l1 m1 s1">
                                    <span style={deletebutton} onClick={()=>this.sample(index)}>
                                        <i className="material-icons">delete</i>
                                    </span>
                                </div>
                            </div>
                        )
                    }
                ):
                <h4 style={{position:'fixed', top:'50%', left:'50%', transform:'translate(-50%,-50%)', margin:'auto', textAlign:'center',width:'100%'}}>Create Todo List!</h4>
                }
            </div>
        )
    }
}


export default ToDoListContainer

