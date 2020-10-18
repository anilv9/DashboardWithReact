import React, { Component } from 'react';
import moment from 'moment';
import Navbar from '../NavBar/Navbar';
import 'whatwg-fetch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  status: {
    danger: 'orange',
  }
});
class Main extends Component{
    constructor(props){
    super(props);
    this.state = {
        isJiraLoaded:false,
        jira : {
            customfields:{}
        },
        jiraList : [],
        allJira: [],
        startDate:null,
        endDate:null,
        checkedJira:undefined,
    }
    this.onDateChanged = this.onDateChanged.bind(this);
    this.onReset = this.onReset.bind(this);
    this.replaceCheckedJira = this.replaceCheckedJira.bind(this);
    }
    componentDidMount(){
        if(location.href.indexOf('start')>-1){
          var url = new URL(location.href);
          var start = +url.searchParams.get('start');
          var end = +url.searchParams.get('end');
          this.setState({
              startDate:start,
              endDate:end
          })
          fetch('/api/getjirabetweendates/'+moment(start).format('YYYY-MM-DD')+'/'+moment(end).format('YYYY-MM-DD')).then((response)=>{
            return response.json();
        }).then((res)=>{
            this.setState({allJira:res});
            this.setState({isJiraLoaded : true});
        })

        }else{
            fetch('/api/getalljiraid').then((response)=>response.json()).then((res)=>{
                this.setState({allJira:res});
                this.setState({isJiraLoaded : true});
            }) 
        }
        localStorage.removeItem('selectedJira')
        
    }
    onReset(){
        fetch('/api/getalljiraid').then((response)=>response.json()).then((res)=>{
            this.setState({allJira:res});
            this.setState({isJiraLoaded : true});
            if(location.href.indexOf('Discover')>-1){
                history.pushState({}, '', '/Discover');
            }else{
                history.pushState({}, '', '/TestReports');
            }
        }) 
    }
    onDateChanged(jiraFilter){
        this.setState({allJira:jiraFilter}) ;
    }
    replaceCheckedJira(checkedJira){
this.setState({checkedJira})
    }
// <AppBar position="static">
// <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
// <div className={'justify-align-center'}>
// <IconButton  color="inherit" aria-label="Menu">
// <MenuIcon />
// </IconButton>
// <Typography variant="title" color="inherit">
// A/B Tests Knowledge base
// </Typography>
// </div>
// <IconButton  color="inherit" aria-label="Menu">
// <AccountCircle />
// </IconButton>
// </Toolbar>
// </AppBar>
    render(){
        if(this.state.isJiraLoaded){
    return (<MuiThemeProvider theme={theme}>
                <div className="main-container">
                        <Navbar allJira={this.state.allJira} startDate={this.state.startDate} endDate={this.state.endDate} onDateChanged={this.onDateChanged} onReset={this.onReset} replaceCheckedJira = {this.replaceCheckedJira} checkedJira={this.state.checkedJira}/>
                      </div>
            </MuiThemeProvider>);
      }else {
         return (<div>Page Loading...</div>);
      }
    }
}

export default Main;
