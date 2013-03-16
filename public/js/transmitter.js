(function(exports, undefined) {

    function Transmitter() {
        this.socket = null;
        this.key = null;

        this.eventData = null;
        this.screen = {};
    }


    Transmitter.INTERVAL = 1000/20;
    Transmitter.SOCKET_ADDR = 'http://194.33.112.64:9000/';


    Transmitter.prototype.init = function() {
        var self = this;
        this.socket = window.io.connect(Transmitter.SOCKET_ADDR);

        this.identify(function() {
            self.bindEvents();
            self.sendTouches();
        });
        this.getViewportSize();
    };


    Transmitter.prototype.identify = function(cb) {
        var self = this;
        this.socket.emit('identify', 'transmitter');
        this.socket.on('identified', function(key) {
            self.key = key;
            cb();
        });
    };


    Transmitter.prototype.bindEvents = function() {
        var self = this;

        ['touchstart','touchmove','touchend','touchcancel'].forEach(function(event) {
            document.addEventListener(event, function(ev) {
                self._eventData = ev;
                ev.preventDefault();
            });
        });

        ['resize','orientationchange','load'].forEach(function(event) {
            window.addEventListener(event, function(ev) {
                self.getViewportSize();
            });
        });
    };


    Transmitter.prototype.sendTouches = function() {
        var self = this,
            ev, touches;

        // send the touches 20 times per second, seems reasonable
        // this because there are a lot of touch events fired, we dont need it super exact
        setInterval(function() {
            ev = self._eventData;
            if(ev) {
                touches = [];
                for(var i=0; i<ev.touches.length; i++) {
                    var touch = ev.touches[i];

                    // calculate x and y in percentages with 2 decimals
                    touches.push({
                        x: Math.round((10000/self._screen.width)*touch.pageX)/100,
                        y: Math.round((10000/self._screen.height)*touch.pageY)/100
                    });
                }
                self.socket.emit('move', touches);
                self._eventData = null;
            }
        }, Transmitter.INTERVAL);
    };


    Transmitter.prototype.getViewportSize = function() {
        this._screen = {
            height: document.documentElement.clientHeight,
            width: document.documentElement.clientWidth
        };
    };


    exports.Transmitter = Transmitter;
})(this);