var http = require("http");
var url = require("url");

var express = require("express");
var cookieParser = require('cookie-parser');
var async = require("async");

var auth = require('./Western/OWL/auth');
var assignmentEntry = require('./Western/OWL/assignmentEntry');
var courseEntry = require('./Western/OWL/courseEntry');

app = express();
app.set('json spaces', 4);

/* Validates login credentials. */
app.get('/api/student/validate', function(req, res) {
	// Check if headers exist...
	if ((req.header('eid') == null) || (req.header('pw') == null)) {
		// Invalid header response.
		res.status(400).send('[ERROR] BAD REQUEST.');
	} else {
        // Perform request.
        let validateRequest = new auth(req.header('eid'), req.header('pw'));
        validateRequest.then((user) => {
            res.send(user);
        })
        validateRequest.catch(function (err) {
            res.send(err.message);
        });
	}
})

app.use(cookieParser())
app.get('/api/courses', function(req, res) {
    if (req.query.url == null) {
        res.status(400).send('[ERROR] BAD REQUEST');
    } else {
        console.log('Cookies: ', req.cookies);

        let courseRequest = new courseEntry(req.query.url, req.cookies);
        courseRequest.then((courses) => {
            res.send(courses);
        })
        courseRequest.catch(function(err) {
            res.send(err.message);
        });
    }
})

app.get('/api/courses/assignments', function(req, res) {
    if (req.query.url == null) {
        res.status(400).send('[ERROR] BAD REQUEST');
    } else {
        console.log('Cookies: ', req.cookies);

        let assignmentsRequest = new assignmentEntry(req.query.url, req.cookies);
        assignmentsRequest.then((assignments) => {
            res.send(assignments);
        })
        assignmentsRequest.catch(function(err) {
            res.send(err.message);
        });
    }
})

/* Returns full student object. */
app.get('/api/student/full', function(req, res) {
    // Obtain user and password...
    var name = req.query.user;
    var password = req.query.pass;

    let currUser = new auth(name, password);

    currUser.then((owlStudent) => {

		async.each(owlStudent.courses, function(item, callback) {
			let assignments = new assignmentEntry(item, owlStudent.cookies);
			assignments.then(() => {
				callback();
			});
		}, function(err) {
			// Send object response.
			res.send(owlStudent);
		});

    });
})

var server = app.listen(8080);

