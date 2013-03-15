var client = new BinaryClient('ws://'+window.location.hostname+':9000');
var stream;
var room = 1;

var faker = new FakeTouches(document.body);
faker.triggerStart();

client.on('open', function(){
    stream = client.createStream({room: room, type: 'receiver'});
    stream.on('data', function(data) {
        var touches = [];
        var percentX = (100/data.width);
        var percentY = (100/data.height);

        var screenWidth = document.documentElement.clientWidth;
        var screenHeight = document.documentElement.clientHeight;

        for(var i=0; i<data.touches.length; i++) {
            touches.push([  (percentX * data.touches[i].pageX) * (screenWidth/100),
                            (percentY * data.touches[i].pageY) * (screenHeight/100)]);
        }

        faker.setTouches(touches);

        switch(data.type) {
            case 'touchstart':
                faker.triggerStart();
                started = true;
                break;

            case 'touchmove':
                if(started) {
                    faker.triggerMove();
                } else {
                    faker.triggerStart();
                }
                break;

            case 'touchend':
                faker.triggerEnd();
                started = false;
                break;

            case 'touchcancel':
                faker.triggerCancel();
                started = false;
                break;
        }
    });
});