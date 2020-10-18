import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Popover from 'react-simple-popover';
import Daterange from '../Daterange/Daterange';
import Navbar from '../NavBar/Navbar';
import DataTable from '../Datatable/Datatable';
import Jira from '../jira-dropdown/jira-dropdown';
import 'whatwg-fetch';
import moment from 'moment';
import $ from 'jquery';
import TagSearch from '../TagInput/TagInput';
import MyCloud from '../TagCloud/MyCloud';
import Button from '@material-ui/core/Button';
import Copy from '@material-ui/icons/Share';
import Card from '@material-ui/core/Card';
//import ReactAwesomePopover from 'react-awesome-popover';

class TimeLine extends Component {
    constructor(props){
    super(props);
    this.state = {
        open: false,
        url:'',
        copied:false,
        res : props.jira,
        testObj: {},
        filteredDate:props.jiraFilter && props.jiraFilter.length  ? props.jiraFilter :props.jira,
        tagFilter:props.jiraFilter || [],
       // startDate : props.jira.map((ele)=>ele.created).sort((a,b)=>moment(new Date(a)).isBefore(moment(new Date(b))))[0],
       startDate:props.startDate, 
       endDate : props.endDate,
        reset:true
    };
    this.getStartDate = this.getStartDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.applyFilterChange = this.applyFilterChange.bind(this);
    this.tagCloudFilter = this.tagCloudFilter.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.ontableRowSelect = this.ontableRowSelect.bind(this);
    this.filterByPod = this.filterByPod.bind(this);
    this.filterByLabel = this.filterByLabel.bind(this);
    this.filterByUrl = this.filterByUrl.bind(this);
    this.filterByStatus = this.filterByStatus.bind(this);
    this.onDateChanged = this.onDateChanged.bind(this);
    this.onReset = this.onReset.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    // this.popref = React.createRef();
    // this.handlePopOpen= this.handlePopOpen.bind(this);
   
}
getStartDate(){
    return this.props.jira.map((ele)=>ele.created).sort((a,b)=>moment(new Date(a)).isBefore(moment(new Date(b))))[0]
}
createStoryJS(res,filter){
    $('#my-timeline').empty();
    let testObj = {
        "timeline":
        {
          "headline":"Welcome to A/B Tests Knowledge Base (ABKB)",
          "type":"default",
          "text":" ",
          "tag":" ", 
          "date": [{
              startDate : moment().format('YYYY,M,D'),
              headLine : 'There are hardly any entries available to display'
          }]
         } 
       }
       if(filter){
           var start_at_slide=1;
       }else{
        start_at_slide=0;
       }
       testObj.timeline.date = res.map((ele)=>{
        return  {tag:(ele.Owning_Pod && ele.Owning_Pod.length  && ele.Owning_Pod[0].value) || '',
        startDate:(ele.Data_Start_Date ? moment(ele.Data_Start_Date).format('YYYY,M,D'):moment().format('YYYY,M,D')),
        endDate: ele.Data_End_Date ? moment(ele.Data_End_Date).format('YYYY,M,D'):'',
            "headline":ele.Test_name+': '+ele.Summary,
            "text":ele.Hypothesis,
            "asset":{
              "media":(ele.Attachments && ele.Attachments.length && ele.Attachments[0].content)||(ele.Attachments && ele.Attachments.length && ele.Attachments[3].content),
              "credit":ele.Platform && ele.Platform.length && ele.Platform[0].value,
          }
          }
       })
      if(testObj.timeline.date.length === 0){
        testObj.timeline.date=[{
            startDate : moment().format('YYYY,M,D'),
            headLine : 'There are hardly any entries available to display'
        }]
      }
      createStoryJS({
          type:		'timeline',
          width:		'1250',
          height:		'700',
          source:		testObj,
          embed_id:	'my-timeline',
          start_at_slide : start_at_slide
      });
      this.setState({testObj:testObj});
    }
    onReset(){
        // history.pushState({}, '', '/Discover')
        // location.reload();
      var component = this;
       this.setState({
                startDate : null,
                endDate:null,
                isLoading:true,
                filteredDate:[]
       });
        fetch('/api/getalljiraid').then((response)=>response.json()).then((res)=>{
            $('#my-timeline').empty();
            component.createStoryJS(res);
            component.props.onJiraFilter(res);
            component.applyFilterChange([])
            component.setState({filteredDate:res})
            component.setState({res});
            component.onDateChanged(res);
            this.setState({isLoading:false});
            this.props.ontableRowSelect('');
            
        }) 
    }
componentDidMount() {
    let component = this;
    let res = (this.props.jiraFilter && this.props.jiraFilter.length) ? this.props.jiraFilter : this.state.res;  
    this.createStoryJS(res)
     if(this.props.jira.length){
         res = this.props.jira;
     }
     this.setState({res : res});
     this.setState({filteredDate:res});
     component.props.onJiraFilter(res);
        $(document).on('click', '.back-home' ,function(){
           component.onReset();
        })
      
       $(document).on('click', '.timenav-tag h3', function(){
        var tagName = this.innerHTML;
        tagName = tagName.split(',');
        var date = res.filter((ele)=>{
            var tag = (ele.Owning_Pod && ele.Owning_Pod.length  && ele.Owning_Pod[0].value) || '';
            return tag && tagName.indexOf(tag)!==-1
        })
    
     component.props.onJiraFilter(date);
        if(date.length === 0){
            date=res;
        }
        component.setState({filteredDate:date});
        component.tagCloudFilter(tagName);
        component.createStoryJS(date,true);
       })
       component.tagCloudFilter([]);
  }

  applyFilterChange(tags, type){
      this.handleChange(tags.map(ele=>ele.name), type);
  }
  tagCloudFilter(tags,type){
    var tagList = this.state.tagFilter;
    tagList.push(...tags)
    this.setState({tagFilter:tagList});
    this.handleChange(tagList);
  }
  filterByUrl(tags,filteredDate){
    filteredDate = filteredDate.filter(ele=>{
        var flag= false;
        tags.map(ele=>ele.toUpperCase()).forEach((element,index)=>{
            if(!flag && ele.URL){
                flag = ele.URL.toUpperCase().indexOf(element)!==-1;
            }
        }) 
        return flag;
    })
    return filteredDate;
  }
  filterByPod(filteredDate){
    filteredDate = filteredDate.filter((ele)=>{
        return (tags.map(ele=>ele.toUpperCase()).indexOf((ele.Owning_Pod && ele.Owning_Pod.length  && ele.Owning_Pod[0].value.toUpperCase()) || '') !== -1)
      });
      if(filteredDate.length === 0){
        filteredDate = this.state.res.filter((ele)=>{
            return (tags.indexOf((ele.Owning_Pod && ele.Owning_Pod.length  && ele.Owning_Pod[0].value) || '') !== -1)
          }); 
      }
      this.setState({filteredDate : filteredDate});
  }
filterByLabel(filteredDate){
    filteredDate = filteredDate.filter((ele)=>{
        var flag= false;
        tags.map(ele=>ele.toUpperCase()).forEach((element,index)=>{
            if(!flag){
                flag = ele.Labels.map(ele=>ele.toUpperCase()).indexOf(element)!==-1
            }
        }) 
        return flag;
    })
    if(filteredDate.length === 0){
        filteredDate = date.filter((ele)=>{
            var flag= false;
            tags.map(ele=>ele.toUpperCase()).forEach((element,index)=>{
                if(!flag){
                    flag = ele.Labels.map(ele=>ele.toUpperCase()).indexOf(element)!==-1
                }
            }) 
            return flag;
        })

    }
    this.setState({filteredDate : filteredDate});
    return filteredDate;
}
filterByStatus(filteredDate){
    filteredDate = filteredDate.filter((ele)=>{
        var flag= false;
        var status = ele.Status.map(ele=>ele.name.toUpperCase());
        tags.map(ele=>ele.toUpperCase()).forEach((element,index)=>{
            if(!flag){
                flag = status.indexOf(element)!==-1
            }
        }) 
        return flag;
    });
    if(filteredDate.length === 0){
        filteredDate = date.filter((ele)=>{
            var flag= false;
            var status = ele.Status.map(ele=>ele.name.toUpperCase());
            tags.map(ele=>ele.toUpperCase()).forEach((element,index)=>{
                if(!flag){
                    flag = status.indexOf(element)!==-1
                }
            }) 
            return flag;
        });
    }
    this.setState({filteredDate : filteredDate});
    return filteredDate;
}

  handleChange(tags,type ,filteredDate){
     let separator = (tags && tags.length) ? '/' : '';
     var url =location.origin+'/Discover';
     if(tags && tags.length){
      history.pushState({}, '', '/Discover'+separator+tags.map(ele=>encodeURIComponent(ele)).join('/'));
      url  = url+'?crep='+btoa(tags.map(ele=>encodeURIComponent(ele)).join('/'));
     }else{
        history.pushState({}, '', '/Discover');
     }
      if(this.state.startDate&& this.state.endDate){
        if(!tags || !tags.length){
            url = url+'?start='+this.state.startDate+'&end='+this.state.endDate;
        }else{
           url = url+'&start='+this.state.startDate+'&end='+this.state.endDate;
        }
      }
      this.setState({url:url});
      this.setState({tagFilter:tags});
      var typeIgnore = true;
      if(type){
        typeIgnore = false;
      }
      var date = this.state.res;
      var filteredDate = filteredDate || this.state.filteredDate;
      if(filteredDate && filteredDate.length===0){
        filteredDate=date;
      }
      if(tags.length){
         if(type === "P"){
            //  console.log("filter by PoD");
            filteredDate = this.filterByPod(filteredDate)
         }else if(type === "L"){
            // console.log("filter by label")
            filteredDate = this.filterByLabel(filteredDate)
         }else if(type === "S"){
            // console.log("filter by status")
            filteredDate = this.filterByStatus(filteredDate);
         }else{
                var filteredDate = date;
                tags.map(ele=>ele.toUpperCase()).forEach((element,index)=>{
                    if(element.indexOf('HTTP')!==-1 || element.indexOf('WWW.')!==-1){
                        filteredDate = this.filterByUrl([element],filteredDate);
                    }else{
                    filteredDate =   filteredDate.filter((ele)=>{
                        var flag = false;
                        var status = ele.Status.map(ele=>ele.name.toUpperCase());
                        if(ele.Owning_Pod && ele.Owning_Pod.length){
                            flag =  ele.Owning_Pod[0].value.toUpperCase().indexOf(element)!==-1;
                        }
                        if(!flag){
                            flag = ele.Labels.map(ele=>ele.toUpperCase()).indexOf(element)!==-1
                        }
                        if(!flag){
                            flag = status.indexOf(element)!==-1;
                        } 
                        if(!flag){
                            flag = (ele.Test_name.toUpperCase() === element);
                        }
                        if(!flag && ele.Hypothesis){
                            flag = (ele.Hypothesis.toUpperCase().indexOf(element)>-1);
                        }
                        return flag;
                    })
                }
                })
                this.setState({filteredDate})
         }
      
}else{
   filteredDate = this.props.jira;
   this.setState({filteredDate});
}
   if(filteredDate.length){
    this.props.onJiraFilter(filteredDate,tags); 
   }else{
    this.props.onJiraFilter(filteredDate,tags);
   }
      this.createStoryJS(filteredDate,true);
return filteredDate;
  }
  removeTag(index){
   var tagFilter = this.state.tagFilter;
   tagFilter.splice(index,1);
   this.setState({tagFilter})
  }
  ontableRowSelect(selectedJira){
    this.props.ontableRowSelect(selectedJira);
}

onDateChanged(filteredDate){
    this.setState({res : filteredDate})
    this.setState({filteredDate});
    this.createStoryJS(filteredDate);
    this.props.onDateChanged(filteredDate);
    this.props.onJiraFilter(filteredDate);
    if(this.state.tagFilter && this.state.tagFilter.length){
     filteredDate = this.handleChange(this.state.tagFilter, undefined, filteredDate);
    }
}
handleClick(e) {
    this.setState({copied: !this.state.copied});
  }
 
  handleClose(e) {
    this.setState({open: false});
  }
//   handlePopOpen(){
//     this.popref.current.select();
//    }

handleChangeStart(date){
     var url = new URL(this.state.url);
    url.searchParams.set('start', +date);
    this.setState({url:url.href});
    this.setState({startDate:+date});
}
handleChangeEnd(date){
    var url = new URL(this.state.url);
    url.searchParams.set('end', +date);
    this.setState({url:url.href});
    this.setState({endDate:+date});
}
onCopy(){
    this.setState({copied:true});
   setTimeout(()=>this.setState({copied:false}),1500);
}

    render(){
        //const Popover = ReactAwesomePopover;
      const {isLoading} =  this.state;
        return (<div className="timeline-container time">
          <Card className={'justify-align-center '}> <div id="my-timeline"></div> </Card>
          <Card className={'padding-8 tag-search-container'} style={{marginTop:'10px'}}>
           <div  style={{marginTop:'0px', display:'inline-block'}}><Daterange handleChangeStart={this.handleChangeStart} handleChangeEnd={this.handleChangeEnd}   onDateChanged={this.onDateChanged} endDate={this.state.endDate} startDate={this.state.startDate}/></div>
          <div style={{marginTop:'27px', float:'right', display:'inline-flex'}}>
                   <Button className="reset-button"
                   variant="contained"
                           size="medium"
                           style={{margin:'12px 10px'}}
                           color="primary" onClick={this.onReset}>
                     {isLoading ? "Resetting.." : "Reset Filters" }
                   </Button>
            <CopyToClipboard text={this.state.url} onCopy={this.onCopy.bind(this)}>
                   <div style={{position:'relative'}} ref="container">
                     <Button variant="contained"
                             size="medium"
                             style={{margin:'12px 8px 0px 0px'}}
                             color="primary"
                             ref="target" >
                       <Copy/>
                       Share Result
                     </Button>
                      <Popover
                      
                      placement='bottom'
                      container={this.refs.container}
                      target={this.refs.target}
                      show={this.state.copied}
                      onHide={this.handleClose.bind(this)} 
                      style={{marginTop:'5px',padding:0,width:'152px'}}>
                      <p className="pop-up">Copied to Clipboard</p>
                      </Popover>
                  </div>
            </CopyToClipboard></div>
             <TagSearch onChange={this.applyFilterChange}  tagList={this.state.tagFilter}  filteredDate={this.state.filteredDate}/>
            </Card>

{/* <Card className={'padding-8'} style={{marginTop:'10px'}}>
<TagSearch onChange={this.applyFilterChange}  tagList={this.state.tagFilter}  filteredDate={this.state.filteredDate}/></Card> */}

          <Card  className={'padding-8'} style={{marginTop:'10px'}}>
             <MyCloud onTagClick={this.tagCloudFilter} filteredDate={this.state.filteredDate} allJira={this.props.jira} tagList={this.state.tagFilter}/></Card>

          <Card  raised={true} className={'padding-8'} style={{marginTop:'10px'}}>
            <DataTable checkedJira={this.props.checkedJira}  jira={this.state.filteredDate} ontableRowSelect={this.ontableRowSelect}/>
        </Card>
      </div>);
}
}
export default TimeLine;
