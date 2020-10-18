import React, { Component } from 'react';
import {Typeahead} from 'react-typeahead';
import Jirainfo from '../AB-Test Reports/Jirainfo';
import 'whatwg-fetch';

class Jira extends Component {
  constructor(props) {
    super(props);
    this.state= {
        availableOptions:[],
        jira:{
            customfields:{}
        }
    }
    this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
            fetch('/api/getalljiraid').then((response)=>response.json()).then((res)=>{
                // console.log(res)
                this.setState({
                    availableOptions : res.map((ele)=>ele.Test_name)
                })
            });
    }
    handleChange(value){
        fetch('/api/getJira/'+value).then((response)=>{
            return response.json();
        }).then((jira)=>{
               this.setState({jira: jira})
              // this.props.onSearch(jira[0]);
        })
    }
	render(){
		return (<div>
                <Typeahead
    options={this.state.availableOptions}
    onOptionSelected = {this.handleChange}
    placeholder="Jira Id"
  />
  <Jirainfo jira={this.state.jira}/> 
  </div>
  )
	}
}

export default Jira;