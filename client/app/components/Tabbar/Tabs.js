import React, { Component } from 'react';
import Card from '@material-ui/core/Card';

 class Tabs extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
          activeTabIndex: +props.activeTabIndex
        };
        this.handleTabClick = this.handleTabClick.bind(this);
      }
    
      handleTabClick(tabIndex) {
        var prev = this.state.activeTabIndex
        this.setState({
          activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        });
      }
    
      renderChildrenWithTabsApiAsProps() {
        return React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            onClick : this.handleTabClick,
            tabIndex: index,
            isActive: index === this.state.activeTabIndex,
            key : index
          });
        });
      }
    
      renderActiveTabContent() {
        const {children} = this.props;
        const {activeTabIndex} = this.state;
        if(children[activeTabIndex]) {
          return children[activeTabIndex].props.children;
        }
      }
 render(){
   return  ( <div className="tabs">
   <ul className="custom-tabs-nav nav">
     {this.renderChildrenWithTabsApiAsProps()}
   </ul>
   <div className="custom-tabs-active-content">
       {this.renderActiveTabContent()}
   </div>
 </div>)
 }
}


export default Tabs;
