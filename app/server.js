var io = require('socket.io').listen(9000),
    uniqueId = require(__dirname +'/unique_id.js').uniqueId;

// only websockets, no fallbacks
io.set('transports', ['websocket']);

/**
 * when a client connects with the server
 */
io.sockets.on('connection', function (socket) {
    // on connect the type of listener must be set
    // and a unique key for the transmitters
    socket.on('identify', function(type) {
        // send key
        socket.simple_key = uniqueId(6);
        socket.emit('identified', socket.simple_key);

        // do thing for each type :-)
        if(type == 'transmitter') {
            transmitterSocket(socket);
        } else {
            receiverSocket(socket);
        }
    });

    // on disconnect we release the uniquekey
    socket.on('disconnect', function () {
        uniqueId.unRegister(socket.simple_key);
    });
});

/**
 * specific transmitter events
 * @param socket
 */
function transmitterSocket(socket) {
    io.sockets.emit('transmitter_hi', socket.simple_key);

    // on disconnect we release the uniquekey
    socket.on('disconnect', function () {
        io.sockets.emit('transmitter_bye', socket.simple_key);
    });

    socket.on('move', function(touches) {
        io.sockets.emit('movement', {
            key: socket.simple_key,
            touches: touches
        });
    });
}


/**
 * specific receiver events
 * @param socket
 */
function receiverSocket(socket) {
    // nothing here yet...
}