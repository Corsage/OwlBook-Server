const osmosis = require('osmosis');
const assignment = require('../assignment');

// Western OWL cookie headers.
const COOKIE_SESSION_ID = 'JSESSIONID';
const COOKIE_ENCRYPYION = 'NSC_pxm.vxp.db--443';

function assignmentEntry(url, cookies) {
    // Initialize an empty array to push assignments into.
    let assignments = [];

    // Return assignments array synchronously.
    return new Promise((resolve, reject) => {
        osmosis
        .get(url)
        .cookie(COOKIE_SESSION_ID, cookies[COOKIE_SESSION_ID])
        .cookie(COOKIE_ENCRYPYION, cookies[COOKIE_ENCRYPYION])
        // Certain courses utilize different <tr> classes.
        .find('tr.internal, tr.external')
        .set({
                'title': 'td.left',
                'due_date': 'td.center[1]',
                'grade': 'td.center[2]',
                'comments': 'td.center[3]'
            })
        .data(function(data) {
            // TODO: Properly format the title, date, and grade.
            assignments.push(new assignment(data.title, data.due_date, data.grade, data.comments));
        })
        .done(() => resolve(assignments))
    })
}

// Export class assignmentEntry.
module.exports = assignmentEntry;
