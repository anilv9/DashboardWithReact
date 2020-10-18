var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportsSchema = new Schema ({
Date : Date,
ControlVisitor:String,
ControlOrders:String,
ControlCR:String,
ChallengerVisitor:String,
ChallengerOrders:String,
ChallengerCR:String
})

module.exports = mongoose.model('testdbmodels5', reportsSchema);