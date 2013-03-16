var getRandomChar = (function() {
    var chars = "23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ".split(""),
        index;
    return function() {
        var index = Math.floor(Math.random() * (50 - 0 + 1)) + 0;
        return chars[index];
    };
})();


exports.uniqueId = (function() {
    var history = [],
        id, chars;

    function generator(length) {
        do {
            chars = [];
            while(chars.length < length) {
                chars.push(getRandomChar());
            }
            id = chars.join("");
        }
        while(history.indexOf(id) > -1);

        history.push(id);

        return id;
    }

    generator.getHistory = function() {
        return history;
    };

    generator.unRegister = function(id) {
        var index = history.indexOf(id);
        if(index > -1) {
            history.splice(index, 1);
        }
    };

    return generator;
})();