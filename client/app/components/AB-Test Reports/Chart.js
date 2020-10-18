import React, { Component } from 'react';

import  {Line} from 'react-chartjs';
import moment from 'moment';

class ChartComp extends Component{
    constructor(props){
        super(props);
        this.state = {
            labels : [],
            data : [],
            data2 : []
        }
    }
    componentDidMount(){
       

    }
  render() {
    var chartData = {
        labels: this.props.labels,
        datasets: [
            {
                label: "Challenger",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data:this.props.data
            },
            {
                label: "Control",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: this.props.data2
            }
        ]
    };
    var chartOptions = {

        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        bezierCurve : true,
        bezierCurveTension : 0.4,
        pointDot : true,
        pointDotRadius : 4,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 2,
        datasetFill : true,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",
        offsetGridLines : false
    };
   
    return (<div className='report-chart'>
        <Line data={chartData} options={chartOptions} width="1270" height="400"/></div>)
        }
}

export default ChartComp;