import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Select from 'react-select';
import 'whatwg-fetch';
import Popover from 'react-simple-popover';
import Button from '@material-ui/core/Button';
import Copy from '@material-ui/icons/ContentCopy';
import Share from '@material-ui/icons/Share';
import Card from '@material-ui/core/Card';

class Searchdropdown extends Component{
    constructor(props){
    super(props);
    this.state = {
        url:'',
        copied:false,
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
    var searchText  = '';
    if(location.href.indexOf('crep')!==-1){
        var url = new URL(location.href);
        searchText = decodeURIComponent(atob(url.hash.substr(1)));
    }else if(location.pathname){
            searchText =  location.pathname.split('/')[2] || '';
            searchText = decodeURIComponent(searchText);
       }
           if(searchText){
           this.setState({selectedOption : searchText});
           this.handleSelectChange({label :searchText});
           this.handleSubmit(searchText);
           }
       
       if(this.props.fromTable && this.props.fromTable.length){
        this.setState({selectOption : this.props.fromTable.map(ele=>{return {value:ele , label : ele}})});  
       }else{
        this.setState({selectOption : this.props.jira.map(ele=>{return {value:ele.Test_name , label : ele.Test_name}})});
       }      
   }
    
    handleChange(event){
        this.setState({value: event.target.value});
    }
    handleSelectChange(selectedOption)  {
        this.setState({ selectedOption });
            // selectedOption can be null when the `x` (close) button is clicked
            if (selectedOption) {
            // console.log(`Selected: ${selectedOption.label}`);
            history.pushState({},selectedOption.label, '/TestReports/'+encodeURIComponent(selectedOption.label));
            this.setState({url:location.origin+'/TestReports?crep=#'+btoa(encodeURIComponent(selectedOption.label))})
            this.handleSubmit(selectedOption.label);
            }else{
                this.props.onSearch({});
                history.pushState({},'', '/TestReports')
                this.setState({url:location.origin+'/TestReports'});
            }
      }
   
    handleSubmit(label){
        fetch('/api/getJira/'+label).then((response)=>{
            return response.json();
        }).then((jira)=>{
            jira.length && jira[0].Attachments.splice(2);
            this.setState({jira: jira})
               this.props.onSearch(jira[0]);
        });
    }
    handleClick(e) {
        this.setState({copied: !this.state.copied});
      }
     
      handleClose(e) {
        this.setState({open: false});
      }
    onCopy(){
        if(this.state.url){
        this.setState({copied:true});
        setTimeout(()=>this.setState({copied:false}),1500);
     }
    }
    render(){
        return (<Card style={{overflow:'visible'}} className="padding-8">
            <div className="search-container-headline">Select a Test-Number to get the Report</div>
          <div style={{marginTop:'5px', display:'inline-flex'}}>
            <form className="drop-down" onSubmit={this.handleSubmit}>
              <Select
                name="form-field-name"
                value={this.state.selectedOption}
                valueKey={this.state.selectedOption && this.state.selectedOption.label}
                optionKey={this.state.selectedOption && this.state.selectedOption.label}
                onChange={this.handleSelectChange}
                options={this.state.selectOption}/>
            </form>
           <div>
            <CopyToClipboard text={this.state.url} onCopy={this.onCopy.bind(this)}>
              <div ref="container" style={{position:"relative"}}>
                  <Button variant={'contained'}
                      color={'primary'}
                      style={{marginBottom:'5px'}}
                      className="test-share"
                      ref="target">
                <Share/>
                Share Result</Button>
                    <Popover 
                      placement='bottom'
                      container={this.refs.container}
                      target={this.refs.target}
                      show={this.state.copied}
                      onHide={this.handleClose.bind(this)} 
                      style={{marginTop:'2px',padding:0,width:'152px'}}>
                      <p className="pop-up">Copied to Clipboard</p>
                      </Popover>
                      </div>
            </CopyToClipboard>
          </div>
            </div>
        </Card>)
    }
}

export default Searchdropdown;