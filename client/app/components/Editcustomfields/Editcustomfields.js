import React, { Component } from 'react';
import Jira from '../jira-dropdown/jira-dropdown';
import 'whatwg-fetch';

class Editcustom extends Component{
    constructor(props){
    super(props);
    this.state={
        res:[],
        result:'',
        recommendation:'',
        jiraId:''
    }
    this.getOptions = this.getOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        //fetch('/api/getalljiraid').then((response)=>response.json()).then((res)=>{
            this.setState({res : this.props.jira});
        //})
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
    handleOptionChange(val){

      }
    handleSubmit(){
        fetch('http://localhost:3000/updatecustom?jiraid='+this.state.jiraId+'&recommendations='+this.state.recommendation+'&results='+this.state.result).then((response)=>response.json()).then((res)=>{
          
        })
    }
   getOptions(res){
       return res.map((ele,index)=>{return <option key={index}>{ele.Test_name}</option>}).join()
   }
  
    render(){
        return ( <form onSubmit={this.handleSubmit} className='editcustom'>
            <label>
              Recommendation:
              <input type="text" value={this.state.recommendation} onChange={this.handleChange} />
            </label>
            <label>
              Result:
              <input type="text" value={this.state.result} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>)
    }
}

export default Editcustom;