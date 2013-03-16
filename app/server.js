var io = require('socket.io').listen(9000),
    remote = require(__dirname +'/remote.js').create(io);