const osmosis = require('osmosis');
const user = require('../user');

function Owl(id, pass) {
    let currUser;

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
                // Send the current context and data to the next command.
                next(context, data);
            }
        })
        .follow('#allSites @href')
        // Get the direct iframe url...
        .set('course_url', 'div.title @href')
        .data(function(data) {
            // Save All Courses URL page.
            currUser.courses_url = data.course_url;
        })
        .done(() => resolve(currUser))
    })
}

module.exports = Owl;
