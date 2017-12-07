var bunyan = require('bunyan');
//file rotation
var logger = bunyan.createLogger({
    name: 'api-logger',
    streams: [{
        path: 'detail-log.txt',
        level: 'info'  //warning,info,error
    }]
});


module.exports = logger;