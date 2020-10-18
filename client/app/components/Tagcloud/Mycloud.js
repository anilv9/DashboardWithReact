import React, { Component } from 'react';
import {TagCloud} from 'react-tagcloud';
import randomColor from 'randomcolor';

class MyCloud extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : [],
      res : props.filteredDate
    }
    this.callback = this.callback.bind(this);
  }
  callback(filteredDate){
    //fetch('/api/getalljiraid').then((response)=>response.json()).then((res)=>{
    var res = (this.props.filteredDate && this.props.filteredDate.length && this.props.filteredDate) || [];
    var foo = function(arr,type) {
      var a = [], b = [], prev;
      arr.sort();
      for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
          a.push(arr[i]);
          b.push(1);
        } else {
          b[b.length-1]++;
        }
        prev = arr[i];
      }
      return a.map((ele,ind)=>{return {value : ele, count: b[ind], key:ele+'**'+type}});
    }
    var dataPod= res.map(function(ele,index){
      return ele.Owning_Pod;
    }).map(function(element){
      return (element && element[0] && element[0].value) || '';
    });
    var dataLabels = res.map(function(ele,index){
      return ele.Labels
    }).filter(ele=>(ele && ele.length>0)).join().split(',');

    var dataStatus = res.map(ele=>(ele.Status && ele.Status[0].name));

    var data = foo(dataPod,'P')
    data.push(...foo(dataLabels, 'L'));
    data.push(...foo(dataStatus, 'S'))


    //var data = foo(data)
    // var data = data.map((ele,ind)=>{
    //   var ele0 = ele.split('**');
    //   return {value : ele0, count: b[ind], key: ele}});
    return data;
    //   });
  }
  componentDidMount(){
    this.callback(this.props.allJira)
  }
  render() {
    let data  = this.callback(this.props.filteredDate);
    data = data.filter(ele=>ele.value && this.props.tagList.map(ele=>ele.toUpperCase()).indexOf(ele.value.toUpperCase())===-1)
    const customRenderer = (tag, size, color) => (
      <span key={tag.key}
      style={{
    animation: 'blinker 3s linear infinite',
    animationDelay: `${Math.random() * 10}s`,
    fontSize: `${size}px`,
    fontFamily: 'sans-serif',
    margin: '2px',
    padding: '2px',
    display: 'inline-block',
    color: `${randomColor({
      hue: '#009688'
    })}`,
  }}>{tag.value}</span>
  );
    return (<div>
      <div className="tags-cloud-headline">Filter by Tags Cloud</div>
    <TagCloud minSize={16}
    maxSize={36}
    tags={data}
    shuffle={false}
    renderer={customRenderer}
    onClick={tag => this.props.onTagClick([tag.value],tag.key.split('**')[1],this.callback)} />
    </div>
  );

  }
}

export default MyCloud;
