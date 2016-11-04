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
    return meetingSearchRouter;
};

module.exports = router;
