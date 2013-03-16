



// only for the development, it has nothing to do with the remote




var connect = require('connect'),
    path = require('path');

var app = connect()
    .use(connect.favicon())
    .use(connect.logger('dev'))
    .use( connect.static(path.resolve("./public")) )
    .use( connect.directory(path.resolve("./public")) )
    .listen(8000);