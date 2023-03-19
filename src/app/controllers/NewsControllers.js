const Course = require('../model/Courses');
const { multipleMongooseToObject } = require('../../tool/mongoose');
class NewControllers {
  //Get news
  index(req, res, next) {
    Course.find({})
      .then((courses) =>
        res.render('news', {
          courses: multipleMongooseToObject(courses),
        }),
      )
      .catch(next);
  }

  show(req, res) {
    res.send('News Detail');
  }
}

module.exports = new NewControllers();
