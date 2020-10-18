import React, { Component } from 'react';
import 'whatwg-fetch';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import ChartComp from '../AB-Test Reports/Chart'
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

class Reportsdaterange extends Component{
    constructor(props){
    super(props);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.state = {
        start : new Date(),
        end : new Date(),
        labels : [],
        data : [],
        data2 : []
    }
    }
    componentDidMount(){
        let url = '/api/getAllAbTest';
        if(this.state.start && this.state.end){
            //if(this.props.dateRange.start && this.statr.dateRange.end){
           // url= '/api/getAllAbTest/'+moment(this.state.start).format('YYYY-MM-DD')+'/'+moment(this.state.end).format('YYYY-MM-DD')
            //}
        }
       
        fetch(url).then((response)=>response.json()).then((res)=>{
           this.setState({labels :  res.map((ele)=>{
                return moment(ele.Date).format('MMM DD');
            })})
            this.setState({data :  res.map((ele)=>{
                return +ele.ChallengerCR.substring(0, ele.ChallengerCR.length-1)
            })})
            
            this.setState({data2 :  res.map((ele)=>{
                return +(ele.ControlCR.substring(0,ele.ControlCR.length-1))
            })})
            //this.setState({res: res.map(ele=>{ele.Date = ""; return ele;})});
            this.props.onDatechange(res)
        }) 
    }
    handleChangeStart(date){
        this.setState({start:date});
    }
    handleChangeEnd(date){
        this.setState({end:date});
    }
    handleSubmit2(event){
        event.preventDefault();
       
       let url = '/api/getAllAbTest';
       if(this.state.start && this.state.end){
           //if(this.props.dateRange.start && this.statr.dateRange.end){
          // url= '/api/getAllAbTest/'+moment(this.state.start).format('YYYY-MM-DD')+'/'+moment(this.state.end).format('YYYY-MM-DD')
           //}
       }
      
       fetch(url).then((response)=>response.json()).then((res)=>{
         res = res.filter(ele=>{return moment(ele.Date).isAfter(this.state.start) && moment(ele.Date).isBefore(this.state.end)})
          this.setState({labels :  res.map((ele)=>{
               return moment(ele.Date).format('MMM DD');
           })})
           this.setState({data :  res.map((ele)=>{
               return +ele.ChallengerCR.substring(0, ele.ChallengerCR.length-1)
           })})
           
           this.setState({data2 :  res.map((ele)=>{
               return +(ele.ControlCR.substring(0,ele.ControlCR.length-1))
           })})
           this.props.onDatechange(res)
           //this.setState({res: res.map(ele=>{ele.Date = ""; return ele;})});
       }) 


    }
    render(){
        return (<Card  className={'padding-8'} style={{marginTop:'5px'}} ><div className='report-daterange'>Select Daterange for Chart&Table</div>
            <form className="form-body" onSubmit={this.handleSubmit2}>
        <div className="date-range">
            <DatePicker  dateFormat="YYYY-MM-DD"  selected={moment(this.state.start)} onChange = {this.handleChangeStart}/>
            <DatePicker  dateFormat="YYYY-MM-DD"  selected={moment(this.state.end)}  onChange = {this.handleChangeEnd}/>
        </div>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{marginLeft:'5px'}}
        >
          <SearchIcon style={{marginRight:'5px'}}/>
          Search
        </Button>

    </form>
     <ChartComp labels ={this.state.labels} data= {this.state.data} data2={this.state.data2}/>
    </Card>)
    }
}

export default Reportsdaterange;
