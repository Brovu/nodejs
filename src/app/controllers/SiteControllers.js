const Course = require('../model/Courses');
const { multipleMongooseToObject } = require('../../tool/mongoose');
class SiteControllers {
  //Get news
  index(req, res, next) {
    Course.find({})
      .then((courses) =>
        res.render('home', {
          courses: multipleMongooseToObject(courses),
        }),
      )
      .catch(next);
  }

  show(req, res) {
    res.send('News Detail');
  }
}

module.exports = new SiteControllers();
