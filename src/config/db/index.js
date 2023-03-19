const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/Brovu_education_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Succeed');
  } catch (error) {
    console.log('Fail');
  }
}

module.exports = { connect };
