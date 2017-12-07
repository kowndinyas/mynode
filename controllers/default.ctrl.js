
var logger = require('../utilities/logger');

var Ctrl = {
    get: function (req, res) {
        logger.error({ name: "test" });
        res.send("Hello Expess! " + process.pid);
    },

    health: function (req, res) {
        res.status(200);
        res.json({ status: 'Up' });
    }
};

module.exports = Ctrl;