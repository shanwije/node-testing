var express = require('express');
var bodyParser = require('body-parser')

var app = express();  
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//---------------------------
var port = 3000;
app.use(express.static(__dirname));
var server = http.listen(port, ()=>{
    console.log('server listning to',server.address());
});
//----------------------------

io.on('connection', (socket) =>{
    console.log('user connected');
})

var msg = [];

app.post('/msg', (req, res)=>{
    console.log("request is ",req.body);
    msg.push(req.body);
    io.emit('myMsg',JSON.stringify(msg));
    res.send(msg);
    // res.sendStatus(200);
})

