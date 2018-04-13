var express = require('express');

var app = express();
var port = 3000;

app.get('/msg', (req, res)=>{
    res.send('hello fucker');
})

app.use(express.static(__dirname));
var server = app.listen(port, ()=>{
    console.log('server listning to',server.address());
});