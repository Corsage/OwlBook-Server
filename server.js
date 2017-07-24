const http = require("http");
const url = require("url");

const express = require("express");
const cookieParser = require('cookie-parser');
const async = require("async");

const auth = require('./Western/OWL/auth');
const assignmentEntry = require('./Western/OWL/assignmentEntry');
const courseEntry = require('./Western/OWL/courseEntry');

app = express();
app.use(cookieParser());
app.set('json spaces', 4);

/** Validates student login credentials.
  * Returns a basic student object if successful.
  * Returns error "INVALID CREDENTIALS" if failed.
  * @param {header} eid
  * @param {header} pw
  */
app.get('/api/student/validate', function(req, res) {
    // Check if headers exist...
    if ((req.header('eid') == null) || (req.header('pw') == null)) {
        // Status 400 - Bad Request.
        res.status(400).send('[ERROR] BAD REQUEST.');
    } else {
        // Request student object.
        let validateRequest = new auth(req.header('eid'), req.header('pw'));
        validateRequest.then((user) => {
            // If validation is successful, sends student object to response.
            res.send(user);
        })
        validateRequest.catch(function (err) {
            // If validation fails, sends an error message to response.
            res.send(err.message);
        });
    }
})

/** Displays an array of course objects based on the student context.
  * @param {query} url
  * @param {cookie} cookies
  */
app.get('/api/courses', function(req, res) {
    // Check if query and cookies exist...
    if (req.query.url == null) {
        // Status 400 - Bad Request.
        res.status(400).send('[ERROR] BAD REQUEST');
    } else {
        console.log('Cookies: ', req.cookies);

        // Request course objects.
        let courseRequest = new courseEntry(req.query.url, req.cookies);
        courseRequest.then((courses) => {
            // Send an array of course objects to response.
            res.send(courses);
        })
        courseRequest.catch(function(err) {
            // Send any errors to response.
            res.send(err.message);
        });
    }
})

/** Displays an array of asssignment objects based on the course context.
  * @param {query} url
  * @param {cookie} cookies
  */
app.get('/api/courses/assignments', function(req, res) {
    // Check if query and cookies exist...
    if (req.query.url == null) {
        // Status 400 - Bad Request.
        res.status(400).send('[ERROR] BAD REQUEST');
    } else {
        console.log('Cookies: ', req.cookies);

        // Request assignment objects.
        let assignmentsRequest = new assignmentEntry(req.query.url, req.cookies);
        assignmentsRequest.then((assignments) => {
            // Send an array of assignment objects to response.
            res.send(assignments);
        })
        assignmentsRequest.catch(function(err) {
            // Send any error messages to response.
            res.send(err.message);
        });
    }
})

/** Displays full student object (student information, courses, and assignments).
  * @param {header} eid
  * @param {header} pw
  */
app.get('/api/student/full', function(req, res) {

    // Check if headers exist...
    if ((req.header('eid') == null) || (req.header('pw') == null)) {
        // Status 400 - Bad Request.
        res.status(400).send('[ERROR] BAD REQUEST');
    } else {
        // Request student object.
        let studentRequest = new auth(req.header('eid'), req.header('pw'));
        studentRequest.then((student) => {
            // Request courses of the student once the student object has been retrieved.
            let courseRequest = new courseEntry(student.courses_url, student.cookies);
            courseRequest.then((courses) => {
                // Assign the retrieved courses to the student.
                student.courses = courses;

                // Create an async task for each course.
                async.each(courses, function(course, callback) {
                    // Request assignments for the course.
                    let assignmentsRequest = new assignmentEntry(course.grades_url, student.cookies);
                    assignmentsRequest.then((assignments) => {
                        // Check if any assignments exist for the course.
                        if (assignments.length != 0) {
                            // Assign retrieved assignments to the course.
                            course.assignments = assignments;
                        }
                        callback();
                    });
                }, function(err) {
                    // Send object response.
                    res.send(student);
                });
            });
        });
    }
})

// Create server listening on port 8080.
var server = app.listen(8080);
