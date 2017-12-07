var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var os = require('os');
//var cluster = require('cluster');


var app = express();

var productRouter = require('./routes/product.router');
var defaultRouter = require('./routes/default.router');
var userRouter = require('./routes/user.router');

var port = process.env.PORT || 3000;

// if (cluster.isMaster) {
//     var cores = os.cpus().length;
//     console.log(cores);
//     for (var i = 0; i < cores; i++)
//         cluster.fork();
// }
// else {
app.listen(port, function () {
    console.log("Server is running...", process.pid);
});
//}

// cluster.on('exit', function () {
//     cluster.fork();
// });

app.use(express.static("uploads/"));
//mongoose.connection.openUri("mongodb://localhost:27017/products");
mongoose.connection.openUri("mongodb://admin:admin@ds163595.mlab.com:63595/products");


mongoose.Promise = global.Promise;

//G:\myproject\express.api\logx.txt
var fileStream = fs.createWriteStream(path.join(__dirname, "logs.txt"), { flags: 'a' });

app.use(morgan('combined', { stream: fileStream }));
app.use(bodyParser.json());

app.use('/', defaultRouter);
app.use('/api/users', userRouter);

//authentication middleware

function authenticate(req, res, next) {

    var user = jwt.verify(req.headers["authorization"], "secret", function (err) {
        if (!err)
            next();
        else {
            res.status(401);
            res.send("unauthorized");
        }
    });

    console.log(user);
}

//app.use(authenticate);


//private
app.use('/api/products', productRouter);

