var title;
var due_date;
var grade;
var comments;


function Assignment(title, due_date, grade, comments) {
    this.title = title;
    this.due_date = due_date;
    this.grade = grade;
    this.comments = comments;
}

// Export class Assignment.
module.exports = Assignment;