var fs = require('fs');
var BinaryServer = require('binaryjs').BinaryServer;

var rooms = {};


var server = BinaryServer({port: 9000});

// Wait for new user connections
server.on('connection', function(client){
    client.on('error', function(e) {
        console.log(e.stack, e.message);
    });

    client.on('stream', function(stream, meta){
        if(meta.type == 'transmitter') {
            rooms[meta.room] = stream;
        }
        else if (meta.type == 'receiver' && rooms[meta.room]) {
            rooms[meta.room].pipe(stream);
        }
    });
});
