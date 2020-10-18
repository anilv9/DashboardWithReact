var JiraModel = require('../../models/jiramodel')
var Testdbmodel = require('../../models/testdbmodel');

module.exports = (app) => {

    app.get('/api/getJira/:jiraid',(req, res,next)=>{
        // console.log('issue number');
        // console.log(req.params.jiraid);
        JiraModel.find({ 'Test_name':req.params.jiraid}, (err,doc)=>{
            if (err)
            res.send(err);
           else  {
            res.send(doc);
           }
       })
    })

    app.get('/api/getjirabetweendates/:start/:end', (req,res,next)=>{
        // console.log(req.params.start); 
        // console.log(req.params.end);
        JiraModel.find({$and :[{"created":{"$gt" : new Date(req.params.start)}}, 
        {"created":{"$lt":new Date(req.params.end)}}]}, (err,doc)=>{
            if (err)
            res.send(err);
           else  {
            res.send(doc);
           }
       })
    })
    app.get('/api/getalljiraid', (req,res,next)=>{
        // console.log('came heare');
        JiraModel.find({}).sort('-created').exec((err,doc)=>{
            if (err)
            res.send(err);
           else  {
            // console.log(doc)
            res.send(doc);
           }
       })
    })

    app.get('/api/getAllAbTest',(req,res,next)=>{
        Testdbmodel.find({}, (err,doc)=>{
           if (err)
            res.send(err);
           else  {
            res.send(doc);
           }
        })
    });
    app.get('/api/getAllAbTest/:start/:end',(req,res,next)=>{
        Testdbmodel.find({$and :[{"Date":{"$gt" : new Date(req.params.start)}}, 
        {"Date":{"$lt":new Date(req.params.end)}}]}, (err,doc)=>{
           if (err)
            res.send(err);
           else  {
            res.send(doc);
           }
        })
    })
   
};
