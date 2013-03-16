(function(exports, undefined) {

    function Receiver() {
        this.socket = null;
        this.key = null;

        this.remotes = {};
    }


    Receiver.SOCKET_ADDR = 'http://'+ location.hostname +':9000';
    Receiver.TOUCH_TEMPLATE = '<div class="touch"></div>';


    Receiver.prototype.init = function() {
        var self = this;
        this.socket = window.io.connect(Receiver.SOCKET_ADDR);
        this.identify(function() {
            self.bindEvents();
        });
    };


    Receiver.prototype.identify = function(cb) {
        var self = this;
        this.socket.emit('identify', 'receiver');
        this.socket.on('identified', function(key) {
            self.key = key;
            cb();
        });
    };


    Receiver.prototype.bindEvents = function() {
        var self = this;

        // new remote
        this.socket.on('transmitter_hi', function(key) {
            self.addRemote(key);
        });

        // remote is gone
        this.socket.on("transmitter_bye", function(key) {
            self.removeRemote(key);
        });

        // remote is moving!
        this.socket.on('movement', function(data) {
            if(!self.remotes[data.key]) {
                self.addRemote(data.key);
            }
            self.showRemote(data.key, data.touches);
        });
    };


    Receiver.prototype.addRemote = function(key) {
        var element = $("<div class='remote'></div>")
            .attr("id", "remote_"+key)
            .appendTo('body');

        this.remotes[key] = {
            color: '#'+ Math.floor(Math.random()*16777215).toString(16), // random color
            element: element
        };
    };


    Receiver.prototype.removeRemote = function(key) {
        if(this.remotes[key]) {
            this.remotes[key].element.remove();
            delete this.remotes[key];
        }
    };


    Receiver.prototype.showRemote = function(key, touches)  {
        var remote = this.remotes[key],
            touch_elements = remote.element.children();

        touches.forEach(function(touch, index) {
            var el = touch_elements[index] ||
                $(Receiver.TOUCH_TEMPLATE)
                    .css('background', remote.color)
                    .appendTo(remote.element);

            $(el).css({
                left: touch.x +"%",
                top: touch.y +"%"
            });
        });

        // remove old touches
        for(var i=touches.length; i<touch_elements.length; i++) {
            $(touch_elements[i]).remove();
        }
    };


    exports.Receiver = Receiver;
})(this);