var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    remote = require(__dirname +'/remote.js').create(io);

app.enable('trust proxy');
app.use(express.static('public'));

server.listen(9000);


app.get('/', function (req, res) {
    res.sendfile('public/receiver.html');
});

app.get('/rc', function (req, res) {
    res.sendfile('public/transmitter.html');
});
