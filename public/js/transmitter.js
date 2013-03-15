var client = new BinaryClient('ws://'+window.location.hostname+'/socket');
var stream;
var room = 1;
client.on('open', function(){
    stream = client.createStream({room: room, type: 'transmitter'});
});

document.addEventListener('touchstart', sendTouches);
document.addEventListener('touchmove', sendTouches);
document.addEventListener('touchend', sendTouches);
document.addEventListener('touchcancel', sendTouches);

function sendTouches(ev) {
    if(!stream) {
        return;
    }

    var touchList = [];
    for(var i=0; i<ev.touches.length; i++) {
        var touch = ev.touches[i];
        touchList.push({
            pageX: touch.pageX,
            pageY: touch.pageY,
            id: touch.identifier
        });
    }

    stream.write({
        type: ev.type,
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
        touches: touchList
    });
    ev.preventDefault();
}