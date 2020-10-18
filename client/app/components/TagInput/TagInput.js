import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'; 
import Autosuggest from 'react-autosuggest';
import ReactTags from 'react-tag-autocomplete';
import '../TagInput/style.css';

class TagSearch extends Component {
  constructor(props) {
    super(props)
    // console.log('this is taglist for filter'+props.tagList)
    this.state = {
      tags: (props.tagList||[]),
      suggetionList:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.getSuggetionList = this.getSuggetionList.bind(this);
    //this.getURL = this.getURL.bind(this);
  }
  componentDidMount(){
    if(this.state.tags.length){
      this.props.onChange(this.state.tags.map((name,id)=>{return {id,name}}));
    }
  }
  
  handleChange(tags) {
      this.setState({tags})
      this.props.onChange(tags);
    
  }
  handleDelete (i) {
    const tags = this.props.tagList.slice(0)
    tags.splice(i, 1)
    var tagList = tags.map(ele=>{
      if(!ele.name){
        return {name:ele}
      }else{
        return ele;
      }
    });
    this.setState({ tags:tagList });
    this.props.onChange(tagList);
  }
 
  handleAddition (tag) {
    var tagList = this.props.tagList.map(ele=>{
      if(!ele.name){
        return {name:ele}
      }else{
        return ele;
      }
    })
    const tags = [].concat(tagList, tag)
    this.setState({ tags })
    this.props.onChange(tags);
  }
 
  handleBlur(){

  }
  getSuggetionList(urlIncluded){
    var statesList = this.props.filteredDate;
    var states = function(){
      var tagList = [];
      statesList.forEach(ele=> {
        var tag = ele.Owning_Pod && ele.Owning_Pod[0] && ele.Owning_Pod[0].value;
        if(tag && tagList.indexOf(tag)===-1 && this.props.tagList.indexOf(tag)===-1){
          tagList.push(tag);
        }
        ele.Labels && ele.Labels.forEach((item, index)=>{
          if(tagList.indexOf(item)===-1 && this.props.tagList.indexOf(item)===-1){
            tagList.push(item);
          }
        })
        ele.Status && ele.Status.forEach((item,index)=>{
          if(tagList.indexOf(item.name)===-1 && this.props.tagList.indexOf(item.name)===-1){
            tagList.push(item.name);
          }
        })
        // urlIncluded && ele.URL && ele.URL.split('/n').forEach((item,index)=>{
        //   if(item.startsWith('http') || item.startsWith('www')){
        //     if(tagList.indexOf(item)===-1 && this.props.tagList.indexOf(item)===-1){
        //       tagList.push(item);
        //     }
        //   }
        // });
      })
     return tagList.map((name,id)=> {return {id,name}});
    }
 
  let suggestions = states.call(this);
  this.setState({suggetionList : suggestions})
  }
  handleInputChange(event){
    if(event.startsWith('http') || event.startsWith('www')){
      this.getSuggetionList(true);
    }else{
      this.getSuggetionList();
    }
  }
  render() {
   
   
   
    return (<div className="tags-searchbar-headline">
      <div className="tags-search">Search by Tags or URL</div>
      {/* <TagsInput renderInput={autocompleteRenderInput} inputProps={{placeholder: "Search..."}} value={this.props.tagList} onChange={this.handleChange} /> */}
      <div>
      <ReactTags
        tags={this.props.tagList.map((name,id)=> {return {id,name}})}
        suggestions={this.state.suggetionList}
        handleDelete={this.handleDelete.bind(this)}
        handleAddition={this.handleAddition.bind(this)}
        handleBlur={this.handleBlur.bind(this)}
        allowNew={true}
        autoresize={true}
        autofocus={false}
        handleInputChange={this.handleInputChange.bind(this)}
        placeholder="Search..."
        />
 
 </div>
      </div>)
  }
}
export default TagSearch;