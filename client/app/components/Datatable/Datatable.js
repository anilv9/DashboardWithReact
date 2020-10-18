import React, { Component } from 'react';
import 'whatwg-fetch';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import ReactTooltip from 'react-tooltip'; 

class DataTable extends Component{
    constructor(props){
    super(props);
    // console.log(props.jira)
    this.toggleRow = this.toggleRow.bind(this);
    this.selectedJira = [];
    this.state = {
      selected :[],
      selectAll:2
    }
    }
    toggleRow(testName){
      const newSelected = Object.assign({}, this.state.selected);
		newSelected[testName] = !this.state.selected[testName];
		this.setState({
			selected: newSelected,
			selectAll: 2
		});
    this.selectedJira = Object.keys(this.state.selected).filter(ele=>this.state.selected[ele]);
      if(this.selectedJira.indexOf(testName)===-1){
        this.selectedJira.push(testName);
      }else{
        this.selectedJira.splice(this.selectedJira.indexOf(testName),1);
      }
      localStorage.setItem('selectedJira',JSON.stringify(this.selectedJira));
      this.props.ontableRowSelect(this.selectedJira)
      
    }
componentDidUpdate(){
  ReactTooltip.rebuild();
}
componentWillMount(){
  if(localStorage.getItem('selectedJira')){
    let checkedJira = JSON.parse(localStorage.getItem('selectedJira'));
    this.props.ontableRowSelect(checkedJira);
    let selected = {};
    checkedJira.forEach(ele=>{
      selected[ele] = true;
    })
    this.setState({selected})
  }
}

    render() {
      let checkedJira;
      if(localStorage.getItem('selectedJira')){
        checkedJira = JSON.parse(localStorage.getItem('selectedJira'));
      }
     
      this.selectedJira= checkedJira || this.props.checkedJira || [];
        const columns = [
          {
            Header: ' ',
						id: "checkbox",
						accessor: "",
						Cell: ({ original }) => {
							return (
								<input
									type="checkbox"
                  className="checkbox"
                  checked={this.state.selected[original.Test_name] === true}
                  onChange= {()=>this.toggleRow(original.Test_name)}
								/>
              );
            },
						sortable: false,
						width: 25
					},
          {
            id: 'TestName',
          Header: ()=>(<span className="table-head-sort">Test Name<a className="sortby"></a></span>),
          accessor: d=>(d.Test_name+' '+d.Summary),
          Cell: ({ original }) =>{
            return (<div className="mouse-hover" data-tip={original.Description}>{original.Test_name +' '+original.Summary}</div>)}
          },
          {
            Header: ' ',
						id: "empty",
            accessor: " ",
            sortable: false,
						width: 10
          },
          {
            id:'Hypothesis',
            Header: ()=>(<span className="table-head-sort">Hypothesis<a className="sortby"></a></span>),
            accessor: 'Hypothesis',
           Cell: ({ original }) =>{
              return (<span className="mouse-hover" data-tip={original.Hypothesis}>{original.Hypothesis}</span>)}
          },
          {
            Header: ' ',
						id: "empty",
            accessor: " ",
            sortable: false,
						width: 10
          },
        {
          id:'Owning Pod',
          Header: ()=>(<span className="table-head-sort">Owning Pod<a className="sortby"></a></span>),
          accessor: d=>(d.Owning_Pod && d.Owning_Pod[0] && d.Owning_Pod[0].value)
         
        },
        {
          Header: ' ',
          id: "empty",
          accessor: " ",
          sortable: false,
          width: 10
        },
         {
          id:'Status',
          Header: ()=>(<span className="table-head-sort">Status<a className="sortby"></a></span>),
          accessor:  d => (d.Status && d.Status[0] && d.Status[0].name)
        }
    ];
      
       return (<div> <div className='datatable'>Data Table</div>
       <ReactTable
          data={this.props.jira}
          defaultPageSize={10}
          minRow="0"
          columns={columns}/>
           <ReactTooltip className='extraClass'  place='right' type="info" effect="float"/>
          </div>)
      }
    }
export default DataTable;