var express = require('express');
var bodyParser = require('body-parser')

var app = express();  
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

var mongoURL = 'mongodb://admin:admin@ds159926.mlab.com:59926/node_mongo_test';

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
// app.

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

mongoose.connect(mongoURL, (err) =>{
    console.log("DB connected , if any error : ", err);
})

var DBModel = mongoose.model('DBModel', {
    name : 'string',
    msg : 'string'
});

//---------------------------
// var port = 3000;

// var server = http.listen(port, ()=>{

// });
app.use(express.static(__dirname));
var server = http.listen(port, ipaddress, function() {
    // Do your stuff
    console.log('server listning to',server.address());
});
//----------------------------

io.on('connection', (socket) =>{
    console.log('user connected');
})

var msg = [];

app.post('/msg', (req, res)=>{
    console.log("request is ",req.body);
    var db = new DBModel(req.body);
    db.save((err) =>{
        if(err){
            conosole.log('err in db', err);
            res.sendStatus(500);
            return;
        } else{
            msg.push(req.body);
            io.emit('myMsg',JSON.stringify(msg));
            // res.sendStatus(200);
            DBModel.find({}, (err, msg)=>{
                if(!err){
                    res.send(msg);
                    return;
                } else {
                    console.log("message finding error ", err);
                }

            })
            // res.send(msg);

        }

    });


})

