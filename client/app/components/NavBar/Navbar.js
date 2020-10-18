import React, { Component } from 'react';
import Tabs from '../Tabbar/Tabs';
import Tab from '../Tabbar/Tab';
import Daterange from '../Daterange/Daterange';
import Jirainfo from '../AB-Test Reports/Jirainfo';
import TimeLine from '../Timeline/Timeline';
import Searchdropdown from '../AB-Test Reports/Searchdropdown';
import Datatable from '../Datatable/Datatable';
// import Reportstable from '../AB-Test Reports/Table';
// import ChartComp from '../AB-Test Reports/Chart';
import Reportsdaterange from '../AB-Test Reports/Reportdaterange';

class Navbar extends Component{
    constructor(props){
        super(props);
        let jiraFilter = [];
        if(location.pathname.indexOf('/Discover')>-1){
            if(location.href.indexOf('crep') !== -1){
                var url = new URL(location.href);
                jiraFilter =  atob(url.searchParams.get('crep')).split('/').map(ele=>decodeURIComponent(ele));
            }else{
            jiraFilter =  location.pathname.split('/').slice(2).map(ele=>decodeURIComponent(ele));
        }
        }
        this.state = {
            jira : {
                customfields:{}
            },
            jiraList:props.jiraList,
            jiraFilter : jiraFilter,
            checkedJira :  props.checkedJira || props.allJira.map(ele=>ele.Test_name)

        }
        this.handleSearchResponse = this.handleSearchResponse.bind(this);
        this.onJiraFilter = this.onJiraFilter.bind(this);
        this.ontableRowSelect = this.ontableRowSelect.bind(this);
        this.onDatechange = this.onDatechange.bind(this);
        this.onReset  = this.onReset.bind(this);
        this.onTabChange = this.onTabChange.bind(this);
        this.getActiveTab= this.getActiveTab.bind(this);
    }
    
    handleSearchResponse(response){
        this.setState({jira : response})
    }
    onJiraFilter(res, jiraFilter){
                this.setState({jiraFilter}) 
      this.setState({checkedJira:  res.map(ele=>ele.Test_name)});
    }
    ontableRowSelect(selectedFilter){
        if (selectedFilter && selectedFilter.length){
            this.setState({checkedJira:selectedFilter});
        }else{
            this.setState({checkedJira:this.props.allJira.map(ele=>ele.Test_name)});
        }
       // this.props.replaceCheckedJira(selectedFilter);
    } 
    onDateChanged(jiraFilter){
        this.setState({allJira : jiraFilter})
        this.setState({checkedJira:  jiraFilter.map(ele=>ele.Test_name)});
    } 
    onDatechange(res){
        this.setState({allJira : res})
    }
    onReset(){
        this.props.onReset();
    }
    onTabChange(){
        this.setState({jira:{
            customfields:{}
        }})
    }
    getActiveTab(){
       if(location.pathnambe){
           if(location.pathname.indexOf('/Discover')>-1){
               return 0;
           } else{
               return 1;
           }
       }else{
           return  0;
       }
    }
   
    render(){
        return (<div className={'row'}>
            <div className={'col-md-10 offset-md-1'}>
            <Tabs activeTabIndex={this.getActiveTab()}>
            <Tab onTabChange={this.onTabChange} iconClassName={'fa fa-headphones'} linkClassName={'custom-link'} taburl="/Discover" tabName="Discover">
               <TimeLine onJiraFilter={this.onJiraFilter} startDate={this.props.startDate} endDate={this.props.endDate} jira={this.props.allJira} jiraFilter={this.state.jiraFilter} allJira={this.state.allJira} ontableRowSelect={this.ontableRowSelect} onDateChanged={this.props.onDateChanged} onReset={this.onReset} checkedJira={this.checkedJira || this.state.checkedJira} />
            </Tab>
            
              <Tab iconClassName={'fa fa-headphones'}  isActive='active'
                 linkClassName={'custom-link'} taburl="/TestReports" tabName="Test Reports">
                <Searchdropdown onSearch={this.handleSearchResponse} jira={this.props.allJira} fromTable={this.state.checkedJira}/>

              {<Jirainfo jira={this.state.jira} allJira={this.props.allJira} fromTable={this.state.checkedJira}/>}
                <Reportsdaterange onDatechange={this.onDatechange} includeChart={true}/>
              {/* <Reportstable jira={this.state.allData}/> */}
            </Tab>
          </Tabs> 
		</div>
	</div>)
    }
}

export default Navbar;
