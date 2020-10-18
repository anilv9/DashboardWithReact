var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customfieldsSchema = new Schema ({
    
    recommendations : {type: String, default : ''}, 
    results : {type: String, default : ''}

})

module.exports = customfieldsSchema;
