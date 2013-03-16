var uniqueId = require(__dirname +'/unique_id.js').uniqueId;

exports.create = function(io) {
    // only websockets, no fallbacks
    io.set('transports', ['websocket']);

    io.sockets.on('connection', function (socket) {
        // on connect the type of listener must be set
        // and a unique key for the transmitters
        socket.on('identify', function(type) {
            // send key
            socket.simple_key = uniqueId(6);
            socket.emit('identified', socket.simple_key);

            // do thing for each type :-)
            if(type == 'transmitter') {
                transmitterSocket(io, socket);
            } else {
                receiverSocket(io, socket);
            }
        });

        // on disconnect we release the uniquekey
        socket.on('disconnect', function () {
            uniqueId.unRegister(socket.simple_key);
        });
    });
};


/**
 * specific transmitter events
 * @param socket
 */
function transmitterSocket(io, socket) {
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
function receiverSocket(io, socket) {

}


/**
 * normalize the x/y positions
 * @param x
 * @param y
 * @param w
 * @param h
 * @param to_w
 * @param to_h
 */
function normalizeXY(x,y, w,h, to_w, to_h) {

}