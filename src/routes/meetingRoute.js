var express = require('express');
var meetingSearchRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function(nav) {
    meetingSearchRouter.route('/')
        .get(function(req, res) {
            console.log('Entering /MeetingSearch');
            res.render('meetingSearch', {
                title: 'Area 71 Meetings',
                nav: nav,
                meeting: []
            });
        });

    meetingSearchRouter.route('/executeSearch')
        .post(function(req, res) {
            console.log(req.body);
            var url = 'mongodb://localhost:27017/meetings'
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('meeting');
                collection.find({
                  $or: [
                    { $or : [ { name: req.body.title } ] },
                    { $or : [ { time: req.body.time } ] },
                    { $or : [ { period: req.body.period } ] },
                    { $or : [ { dayOfWeek: {'$in': req.body.day } } ] }
                  ]
                }).toArray(
                    function(err, results) {
                        if (err) {
                            console.log('error get meeting collection');
                        } else if (results.length) {
                            console.log('successfully got meeting collection');
                            res.render('meeting', {
                                meeting: results
                            });
                        } else {
                            console.log('no meeting documents found');
                            res.render('meeting', {
                                meeting: results
                            });
                        }
                    });
            });

        });
    return meetingSearchRouter;
};

module.exports = router;
