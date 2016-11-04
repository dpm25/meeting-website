// Express and make app global
var express = require('express');
var app = module.exports = express();
// body-parser
var bodyParser = require('body-parser');
// mongo db
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

// set PORT to env or default to 3000
var port = process.env.PORT || 3000;

// Navigation array
var nav = [{
    Link: '/MeetingSearch',
    Text: 'Meeting Search'
}];

// set the static lib
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// sets the view engine to EJS (embedded JavaScript)
app.set('view engine', 'ejs');

// set path for views
app.set('views', './src/views');

// import meetingSearch module and set it to variable.
// Use it when the /MeetingSearch url is requested
var meetingSearchRouter = require('./src/routes/meetingRoute')(nav);
app.use('/MeetingSearch', meetingSearchRouter);

// set the '/' to display the index EJS ()
app.get('/', function(req, res) {
    var url = 'mongodb://localhost:27017/meetings'
    mongodb.connect(url, function(err, db) {
        var collection = db.collection('meeting');
        collection.find().toArray(
            function(err, results) {
                res.render('index', {
                    title: 'Area 71 Meetings',
                    nav: nav,
                    meeting: results
                });
            });
    });
});

// set the /getDayOfWeek path and query database for meetings
app.get('/getDayOfWeek', function(req, res) {
    var day = req.query.data;
    console.log('data: ' + day);
    var url = 'mongodb://localhost:27017/meetings'
    mongodb.connect(url, function(err, db) {
        var collection = db.collection('meeting');
        collection.find({
            dayOfWeek: day
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

// express listen print out current port
app.listen(port, function(err) {
    console.log('running server on port ' + process.env.PORT);
});
