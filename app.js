var express = require('express');
var app = express();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;


// set PORT to env or default to 3000
var port = process.env.PORT || 3000;

// sets the view engine to EJS (embedded JavaScript)
app.set('view engine', 'ejs');

// set path for views
app.set('views', './src/views');

// set the static lib
app.use(express.static('public'));

// Navigation array
var nav = [{
    Link: '/Home',
    Text: 'Home'
}, {
    Link: '/MeetingSeach',
    Text: 'Meeting Search'
}];

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

// express listen print out current port
app.listen(port, function(err) {
    console.log('running server on port ' + process.env.PORT);
});
