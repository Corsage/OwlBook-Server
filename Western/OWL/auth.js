var osmosis = require('osmosis');
var user = require('../user');
var course = require('../course');
var assignmentEntry = require('./assignmentEntry')

// user.
var currUser;

// Osmosis Configuration.

function Owl(id, pass) {
    return new Promise((resolve, reject) => {
        osmosis
        .post('https://owl.uwo.ca/portal/relogin')
        .login(id, pass)
        .then(function(context, data, next) {
            // Redirected if successful login.
            if (context.doc().request.pathname === '/portal/relogin') {
                reject(new Error('INVALID CREDENTIALS'));
            } else {
                // Successful login, create new user.
                currUser = new user(id, pass, context.doc().cookies, new Array())
                // Send data to the next command.
                next(context, data);
            }
        })
        .follow('#allSites @href')
        .set('course_url', 'div.title @href')
        .data(function(data) {
            // Save All Courses URL page.
            currUser.course_url = data.course_url;
        })
        .done(function() {
            // Return current user object.
            resolve(currUser);
        })
    })
}

module.exports = Owl;