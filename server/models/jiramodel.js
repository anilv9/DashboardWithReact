var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customfieldsSchema = require('./customfieldsmodel');

var abtestSchema = new Schema ({
    Test_name: String, //CRO_Issue_Key
    Summary: String,
    Description:String,
    Hypothesis: String,
    Labels: [String],
    Owning_Pod: [{
        value: String
    }],
    Site_Area: [{value:String}],
    Status: [{name:String}],
    URL: String,
    Metrics :String,
    Primary_Metric : [{
        value:String
    }],
    Secondary_Metric : [{
        value:String
    }],
    Data_Start_Date :Date,
    Data_End_Date : Date,
    Test_Approach : [{value:String}],
    Target_Release_Date:Date,
    created : Date,
    Attachments: [{
        content : String
    }],
    customfields : {type :customfieldsSchema, default:{}}
})

module.exports = mongoose.model('abtestsinfomodel', abtestSchema);