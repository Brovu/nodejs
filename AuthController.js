const user = require("../signIn-signOut/backend/model/Account");
const bcrypt = require("bcrypt");

const AuthController = {
  //Register
  registerUsers: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //Create new user
      const newUser = await new user({
        userName: req.body.userName,
        email: req.body.email,
        password: hashed,
      });

      //Save to DB
      const User = await newUser.save();
      res.status(200).json(User);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = AuthController;
