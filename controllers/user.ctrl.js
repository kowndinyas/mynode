var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var logger = require('../utilities/logger');

module.exports = {

    register: function (req, res) {

        // password --> abcde192k2932 --> 1skdjfijzjk --> 232i3uksjdfjadf
        var encryptedPwd = bcrypt.hashSync(req.body.password, 2);
        req.body.password = encryptedPwd;

        var user = new User(req.body); //payload

        user.save(function (err) {
            logger.info({ msg: "Success" });
            if (!err) {
                res.status(201);
                res.send("Registered");
            }
            else {
                var log = {
                    source: 'User Controller',
                    handler: 'Save handler',
                    err: err
                };
                logger.error(log);
                res.status(500);
                if (err && err.errmsg && err.errmsg.indexOf("E11000 duplicate key error index") > -1)
                    res.send("Email already exists");
                else
                    res.send(err);
            }
        });
    },

    login: function (req, res) {
        var user = new User(req.body);

        User.findOne({ email: user.email })
            .exec()
            .then(function (user) {
                if (user) {

                    //alt+shift+F
                    var validation = bcrypt.compareSync(req.body.password, user.password);

                    if (validation) {
                        res.status(200);
                        var token = jwt.sign({ email: user.email, role: 'admin' }, "secret", {
                            expiresIn: "5m"
                        });

                        var response = {
                            email: user.email,
                            token: token
                        };
                        res.send(response);
                    }
                    else {
                        res.status(401);
                        res.send("Wrong username or password");
                    }
                }
                else {
                    res.status(401);
                    res.send("unauthorized");
                }
            })
            .catch(function (err) {
                res.status(500);
                res.send(err);
            });

    }
};