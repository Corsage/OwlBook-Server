const osmosis = require('osmosis');
const course = require('../course');

// Western OWL cookie headers.
const COOKIE_SESSION_ID = 'JSESSIONID';
const COOKIE_ENCRYPYION = 'NSC_pxm.vxp.db--443';

function courseEntry(url, cookies) {
    let courses = [];
    return new Promise((resolve, reject) => {
        osmosis
        .get(url)
        .cookie(COOKIE_SESSION_ID, cookies[COOKIE_SESSION_ID])
        .cookie(COOKIE_ENCRYPYION, cookies[COOKIE_ENCRYPYION])
        .find('tr')
        .set({
            'course': 'td[headers="type"]',
            'link': 'h4 > a@href',
            'name': 'h4 > a[href]',
            'creator': 'td[headers="createdBy"]'
        })
        // Follow all occurances of the first <h4> <a/> </h4> within each <tr>.
        .follow('td[headers="title"] > h4 a[1]')
        // Each course sets one or the other title value to <a>.
        .follow('a[title="For storing and computing assessment grades from Tests & Quizzes or that are manually entered"] @href, a[title="Gradebook"] @href')
        // Get the direct iframe url..
        .set({
            'grade_url': 'div.title @href'
        })
        .data(function(data) {
            console.log(data.name);
            // Table may contain outliers.
            if (data.course === 'course') {
                // Name contains title and section.
                var name = data.name.split(' ');
                courses.push(new Course((name[0] + ' ' + name[1]), data.creator, name[2], data.link, data.grade_url));
            }
        })
        .done(() => resolve(courses))
    })
}

// Export class courseEntry.
module.exports = courseEntry;
