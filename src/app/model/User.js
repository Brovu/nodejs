const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String },
    password: { type: String },
  },
  {
    collection: "user",
  }
);

const UserModel = mongoose.model("User", User);
module.exports = UserModel;
