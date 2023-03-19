const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema(
  {
    name: { type: String },
    decription: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    videoId: { type: String },
  },
  {
    timestamps: true,
  },
);

//Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

module.exports = mongoose.model('Courses', Course);
