var osmosis = require('osmosis');
var async = require("async");

var Course = require('../course');

// Western OWL cookie headers...
var COOKIE_SESSION_ID = 'JSESSIONID';
var COOKIE_ENCRYPYION = 'NSC_pxm.vxp.db--443';

var courses = new Array();

function courseEntry(url, cookies) {
    return new Promise((resolve, reject) => {
        osmosis
        .get(url)
        .cookie(COOKIE_SESSION_ID, cookies[COOKIE_SESSION_ID])
        .cookie(COOKIE_ENCRYPYION, cookies[COOKIE_ENCRYPYION])
        // Find all occurances of table row (each course has its own row).
        .find('tr')
        // Parse information from inside the table row.
        .set({
            'course': 'td[headers="type"]',
            'link': 'h4 > a@href',
            'name': 'h4 > a[href]',
            'creator': 'td[headers="createdBy"]'
        })
        .follow('td[headers="title"] > h4 a[1]')
        .follow('a[title="For storing and computing assessment grades from Tests & Quizzes or that are manually entered"] @href, a[title="Gradebook"] @href')
        .set({
            'grade_url': 'div.title @href'
        })
        .data(function(data) {
            if (data.course === 'course') {
                // Name contains title and section.
                console.log(data.name);
                var name = data.name.split(' ');
                courses.push(new Course(name[0] + ' ' + name[1], data.creator, name[2], data.link, data.grade_url));
            }
        })
        .done(function() {
            // Return courses object.
            resolve(courses);
        })
    })
}

// Export class courseEntry.
module.exports = courseEntry;