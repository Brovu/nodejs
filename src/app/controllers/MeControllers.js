const Course = require("../model/Courses");
const { multipleMongooseToObject } = require("../../tool/mongoose");
class MeControllers {
  //GET /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery, Course.countDocuments()])
      .then(([courses, quanityCourses]) =>
        res.render("me/stored-courses", {
          quanityCourses,
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
  //GET /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render("me/trash-courses", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeControllers();
