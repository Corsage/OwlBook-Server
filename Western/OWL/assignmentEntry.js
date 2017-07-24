var osmosis = require('osmosis');
var assignment = require('../assignment');

// Western OWL cookie headers...
var COOKIE_SESSION_ID = 'JSESSIONID';
var COOKIE_ENCRYPYION = 'NSC_pxm.vxp.db--443';

let assignments = new Array();

function assignmentEntry(url, cookies) {
	return new Promise((resolve, reject) => {
		osmosis
		.get(url)
		.cookie(COOKIE_SESSION_ID, cookies[COOKIE_SESSION_ID])
		.cookie(COOKIE_ENCRYPYION, cookies[COOKIE_ENCRYPYION])
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
		.done(function() {
			resolve(assignments);
		})
	})
}

// Export class assignmentEntry.
module.exports = assignmentEntry;