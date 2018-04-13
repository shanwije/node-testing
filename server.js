var express = require('express');
var bodyParser = require('body-parser')

var app = express();


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//---------------------------
var port = 3000;
app.use(express.static(__dirname));
var server = app.listen(port, ()=>{
    console.log('server listning to',server.address());
});
//----------------------------

var msg = [];

app.post('/msg', (req, res)=>{
    console.log("request is ",req.body);
    msg.push(req.body);
    res.send(msg);
    // res.sendStatus(200);
})

