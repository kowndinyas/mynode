var Review = require('../models/review.model');

module.exports = {

    save: function (req, res) {
        var review = new Review(req.body);

        review.save()
            .then(function (obj) {
                res.status(200);
                res.json(obj);
            })
            .catch(function (err) {
                res.status(500);
                res.send("Internal Server Error");
            });
    }
}
