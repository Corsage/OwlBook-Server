class Course {

    constructor(title, teacher, section, home_url, grades_url) {
        this.title = title;
        this.teacher = teacher;
        this.section = section;

        this.home_url = home_url;
        this.grades_url = grades_url;
    }
}

// Export class Course.
module.exports = Course;