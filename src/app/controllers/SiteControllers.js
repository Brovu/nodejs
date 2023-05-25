const Course = require("../model/Courses");
const { multipleMongooseToObject } = require("../../tool/mongoose");
const jwt = require("jsonwebtoken");

class SiteControllers {
  index(req, res, next) {
    Course.find({})
      .then((courses) =>
        res.render("home", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new SiteControllers();
