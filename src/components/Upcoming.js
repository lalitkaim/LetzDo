import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import ToDoListContainer from './ToDoListContainer'
import ToDoInput from './ToDoInput'
import classes from './Upcoming.module.css'
import { initialize } from './Config'

class Upcoming extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             date: new Date(),
             mydate:new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear(),
             inputVal:'',
             temp:0
        }
        
        this.inputRef=React.createRef()
    }

    submitHandler = (event) => {
        event.preventDefault();
        let temp=[]
        const db = initialize.database();
        db.ref("letzdo/"+initialize.auth().currentUser.uid+'/'+this.state.mydate+"/todoRoot")
        .once('value',res=>{
            if(res.exists())
                temp=res.val()
            temp=[...temp,{text:this.state.inputVal, key:Math.random()}]
        })
        db.ref("letzdo/"+initialize.auth().currentUser.uid+'/'+this.state.mydate).set({
            todoRoot:temp
        })
        this.setState({inputVal:''})
        window.scrollTo(0,document.body.clientHeight)
    }
    
    inputHandler = (event) =>{
        this.setState({inputVal:event.target.value})
    }


    dateHandler = (date) =>{
        if(date===null){
            this.setState(
                {
                    date : new Date(),
                    mydate:new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()
                }
            )
            return 
        }
        else{
            this.setState(
                {
                    date:date,
                    mydate:date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()
                }
            )
        }
    }

    componentDidMount(){
        this.setState(
            {
                mydate:this.state.date.getDate()+'-'+(this.state.date.getMonth()+1)+'-'+this.state.date.getFullYear()
            }
        )

    }

    inputRef(){
        this.inputRef.current.focusInput();
    }

    temp=()=>{
        this.setState({temp:this.state.temp+1})
    }

    render() {
        return (
            <div className="container" style={{paddingBottom:'50px'}}>
                <div  style={{display:'flex', justifyContent:'space-between', margin:'0 0 10px'}}>
                    <DatePicker className={classes.datepicker} onChange={this.dateHandler} value={this.state.date}></DatePicker>
                </div>
                <ToDoListContainer date={this.state.mydate} usedforrerendering={this.state.inputVal} temp={this.state.temp}/>
                <ToDoInput ref={this.inputRef} submit={this.submitHandler} inputVal={this.state.inputVal} onChange={this.inputHandler}/>
            </div>
        )
    }
}

export default Upcoming
