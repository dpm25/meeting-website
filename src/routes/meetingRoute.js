var express = require('express');
var meetingSearchRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function(nav) {
    meetingSearchRouter.route('/')
        .get(function(req, res) {
            res.render('meetingSearch', {
                title: 'Area 71 Meetings',
                nav: nav
            });
        });

    meetingSearchRouter.route('/search')
        .post(function(req, res) {
            var day = req.body.day;
            console.log(day);
            // var url = 'mongodb://localhost:27017/meetings'
            // mongodb.connect(url, function(err, db) {
            //
            // });
        });
    return meetingSearchRouter;
};

module.exports = router;
