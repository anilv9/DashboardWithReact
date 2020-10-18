import React, { Component } from 'react';
import 'whatwg-fetch';
import ReactTable from "react-table";
import 'react-table/react-table.css' 

class Reportstable extends Component{
    constructor(props){
    super(props);
    this.state = {
      res:this.props.jira||[]
    }
   
    }
    componentDidMount(){
      fetch('/api/getAllAbTest').then((response)=>response.json()).then((res)=>{
        // console.log(res);
        this.setState({res: res});
    }) 
    }
    render() {
      const data = this.props.jira;
    
      const columns = [
        // {
        //   Header: 'Experience',
        //   accessor: 'Control' 
        // }, 
      {
        Header: 'ControlOrders',
        accessor: 'ControlOrders' 
      },
      {
        Header: 'ControlVisitor',
        accessor : 'ControlVisitor'
      },
      {
        Header: 'ControlCR',
        accessor: 'ControlCR' 
      },
      
      {
        Header: 'ChallengerOrders',
        accessor: 'ChallengerOrders' 
      },
      {
        Header: 'ChallengerVisitor',
        accessor : 'ChallengerVisitor'
      },
      {
        Header: 'ChallengerCR',
        accessor: 'ChallengerCR' 
      }
      ]
    
      return (<ReactTable
        data={data}
        defaultPageSize={5}
        columns={columns}/>)
      } 
    
  }
export default Reportstable;