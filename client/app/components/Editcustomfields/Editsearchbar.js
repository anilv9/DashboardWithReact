import React, { Component } from 'react';
import Select from 'react-select';
import 'whatwg-fetch';

class Editsearch extends Component{
    constructor(props){
    super(props);
    this.state = {
        value:'',
        jira:[],
        selectedOption: '',
        selectOption:[]
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    }
   componentDidMount(){
    fetch('/api/getalljiraid').then((response)=>response.json()).then((res)=>{
        this.setState({selectOption : res.map(ele=>{return {value:ele.Test_name , label : ele.Test_name}})});
    })
   }
    
    handleChange(event){
        this.setState({value: event.target.value});
    }
    handleSelectChange(selectedOption)  {
        this.setState({ selectedOption });
            // selectedOption can be null when the `x` (close) button is clicked
            if (selectedOption) {
            // console.log(`Selected: ${selectedOption.label}`);
            this.handleSubmit(selectedOption.label);
            }
      }
   
    handleSubmit(label){
        fetch('/api/getJira/'+label).then((response)=>{
            return response.json();
        }).then((jira)=>{
            jira.length && jira[0].Attachments.splice(4);
            this.setState({jira: jira})
               this.props.onSearch(jira[0]);
        })
    }
    render(){
        return (<div className="search-container"><div className="results-headline">Add/Edit Results & Recommendations</div>
            <form className="form-body" onSubmit={this.handleSubmit}>
            <Select
            name="form-field-name"
            value={this.state.selectedOption}
            onChange={this.handleSelectChange}
            options={this.state.selectOption}
            />
            </form>
        </div>)
    }
}

export default Editsearch;