import React, { Component } from 'react';
import 'whatwg-fetch';


class Tab extends Component{
    constructor(props, context) {
        super(props, context);
        this.handleTabClick = this.handleTabClick.bind(this);
      }
    
      handleTabClick(event) {
        event.preventDefault();
        if(!event.target.classList.contains('active')){
        this.props.onClick(this.props.tabIndex);
        history.pushState(null, null,event.target.href)
       if(typeof this.props.onTabChange === "function"){
        this.props.onTabChange();
       }
      } 
      }
    
      render() {
        return (
          <li  key={this.props.tabIndex} className={'custom-tab '+(this.props.isActive ? 'active' : '')}>
            <a href={this.props.taburl} className={`tab-link ${this.props.linkClassName} ${this.props.isActive ? 'active' : ''}`}
               onClick={this.handleTabClick}>
              <i className={`tab-icon ${this.props.iconClassName}`}/>
              {this.props.tabName}
            </a>
          </li>
        );
      }
}

export default Tab;
