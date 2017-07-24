var id;
var pass;

var name;
var email;

// Cookies
var cookies;

var course_url;
var courses;

function User(id, pass, cookies, courses) {
    this.id = id;
    this.pass = pass;

    //var xd = new auth(id, pass);

    this.cookies = cookies;
    this.courses = courses;
}

User.prototype.addCourse = function(xd) {
    courses.push(xd);
}

User.prototype.addCookie = function(header, value) {
    cookies.set(header, value);
}

User.prototype.getCookie = function(header) {
    return cookies.get(header);
}

// Export class User.
module.exports = User;