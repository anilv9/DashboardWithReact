import React, { Component } from 'react';
import 'whatwg-fetch';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
class Daterange extends Component{
    constructor(props){
    super(props);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.state = {
        start : props.startDate,
        end : props.endDate,
        jira : [],
        chart : false,
        includeChart:props.includeChart
    }
    }
    handleChangeStart(date){
        this.props.handleChangeStart(date);
        this.setState({start:date});
    }
    handleChangeEnd(date){
        this.props.handleChangeEnd(date);
        this.setState({end:date});
    }
    handleSubmit2(event){
        this.setState({
            jira : [],
            chart : false
        })
        event.preventDefault();
        if(this.state.start && this.state.end){
        fetch('/api/getjirabetweendates/'+moment(this.state.start).format('YYYY-MM-DD')+'/'+moment(this.state.end).format('YYYY-MM-DD')).then((response)=>{
            return response.json();
        }).then((jira)=>{
               this.setState({jira: jira})
               this.setState({chart :true});
               this.props.onDateChanged && this.props.onDateChanged(jira);
        });
    }
    }
    render(){
        return (<div  className={'padding-8'} style={{marginTop:'0px'}}>
            <div className='jira-daterange'>Filter by Daterange</div>
            <form className="form-body" onSubmit={this.handleSubmit2}>
            <div className="date-range">
            <DatePicker  dateFormat="YYYY/MM/DD" placeholderText="YYYY/MM/DD"  selected={(this.state.start && moment(this.state.start))||null} onChange = {this.handleChangeStart}/>
            <DatePicker  dateFormat="YYYY/MM/DD" placeholderText="YYYY/MM/DD"  selected={(this.state.end && moment(this.state.end))||null}  onChange = {this.handleChangeEnd}/>
            </div>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
                style={{marginLeft:'5px'}}
              >
                <SearchIcon style={{marginRight:'5px'}}/>
                Search
              </Button>
            </form>
            {this.state.chart && this.state.includeChart ?  <Line startDate = {this.state.start} endDate= {this.state.end}/> : ''}
            </div>)
    }
}

export default Daterange;
