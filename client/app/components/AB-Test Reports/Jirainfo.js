import React, { Component } from 'react';
import 'whatwg-fetch';
import moment from 'moment';
import Card from '@material-ui/core/Card';

class Jirainfo extends Component{
    constructor(props){
        super(props);
        this.getFormattedDate = this.getFormattedDate.bind(this);
        this.getURL = this.getURL.bind(this);
        this.getAllURLs = this.getAllURLs.bind(this);
    }
    getFormattedDate (date){
        return moment(date).utc().format("MM/DD/YYYY");
           // var date = new Date(date);
           //return (date.getMonth()+1)+ '/' + (date.getDate())+ '/' + date.getFullYear()
    }
    getURL (url){
        let arrayRandom = [];
        for(let i=0; i<1000;i++){
            let randomNumber = Math.floor(Math.random()*100000)
            if(arrayRandom.indexOf(randomNumber)===-1){
                arrayRandom.push(randomNumber)
            }
        }
       var uniqueKeys= [];
       var index=0;
        return url.split('\n').map((ele,index)=>{
            var test = arrayRandom[index];
            var key = ele+'_'+test;
             if(uniqueKeys.indexOf(key) !== -1){
                 key = key + ''+(index++)+ Math.floor(Math.random()*100000);
             }
             uniqueKeys.push(key);
            if(ele.indexOf('http')!==-1 || ele.indexOf('www')!==-1 || ele.indexOf('.html '!==-1))
            {
                return <div key={key}><a target="_blank" href={ele}>{ele}</a></div>
            }else{
                return <div key={key}>{ele}</div>
            }
        })
    }
    getAllURLs(){
        return this.getURL(this.props.allJira.
        filter(ele=>this.props.fromTable.indexOf(ele.Test_name)!==-1).
        map(ele=>(ele.URL)).
        join('\n'));
    }
    render(){
        return (<Card  style={{marginTop:'5px'}}  className="padding-8 jira-detail-body">
                <div className="jira-detail-body-left">
                {(this.props.jira  && this.props.jira.Test_name)? 
                (<div>
                {/* <div><strong>Test Name:</strong>{(this.props.jira && this.props.jira.Test_name) ? (this.props.jira.Test_name) : ' '}  
                {(this.props.jira && this.props.jira.Summary) ? (this.props.jira.Summary) : ''}</div> */}

                <div><strong>{(this.props.jira && this.props.jira.Summary) ? (this.props.jira.Summary) : ''}</strong></div>

                <div><strong>Projected Launch Date:</strong>{(this.props.jira && this.props.jira.Target_Release_Date) ?  
                    ((this.getFormattedDate(this.props.jira.Target_Release_Date) )) : ''}</div>

                <div><strong>JIRA ID:</strong> {(this.props.jira && this.props.jira.Test_name) ? (this.props.jira.Test_name) : ''}</div>

                <div><strong>Success Metric:</strong> {(this.props.jira && this.props.jira.Primary_Metric) ? (this.props.jira.Primary_Metric.map((element)=>{return element.value})) : ''}</div>

                <div className="data-date-field"><div><strong>Data Start Date:</strong>{(this.props.jira && this.props.jira.Data_Start_Date) ?((this.getFormattedDate(this.props.jira.Data_Start_Date) )) : ''}</div>
                <div><strong>Data End Date:</strong> {(this.props.jira && this.props.jira.Data_End_Date) ?  
                    ((this.getFormattedDate(this.props.jira.Data_End_Date) )) : ''} </div></div>
                <div><strong>Hypothesis:</strong></div><div className='field-container'><div className="hypohesis">{(this.props.jira && this.props.jira.Hypothesis) ? (this.props.jira.Hypothesis) : ''}</div></div>                
                <div className="headline-container">Description:</div>
                <div className='field-container'><div className="description">
                     {(this.props.jira && this.props.jira.Description) ? (this.props.jira.Description) : ''}</div>
                     </div></div>) : ''}
                <div className="headline-container">Test URL(s):</div>
                 <div className='field-container'>{/* <div className="field-container">{this.props.jira && this.props.jira.URL}</div> */}
                  {(this.props.jira && this.props.jira.URL )? (this.getURL(this.props.jira.URL)) : this.getAllURLs()}</div>
               
                  {(this.props.jira && this.props.jira.Test_name) ?( <div><div><strong>Attachment Screenshots:</strong></div>

                <div>{this.props.jira.Attachments && this.props.jira.Attachments.map((imagecontent,index) => <a key={index} href={imagecontent.content} target="_blank"><img className="variant-screen" key={index} src={imagecontent.content}/></a>)}</div></div>):''}
                </div>
                
                {(this.props.jira   && this.props.jira.Test_name) ? (<div className="jira-detail-body-right">
                    <div><strong>Results:</strong> {(this.props.jira && this.props.jira.customfields.results) ? (this.props.jira.customfields.results) : ''}</div>
                    <div><strong>Recommendations:</strong> {(this.props.jira && this.props.jira.customfields && this.props.jira.customfields.recommendations) ? (this.props.jira.customfields.recommendations) : ''}
                     </div> 
                </div>) :''}
            </Card>)
    }
}

export default Jirainfo;
