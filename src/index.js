const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const port = 3000;
const methodOverride = require("method-override");
const sortMiddleware = require("./app/middleware/SortMiddleware");
const UserModel = require("./app/model/User");
const route = require("./routes");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const db = require("./config/db");

//Connect to DB
db.connect();

//Apply midleware
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));
//=============//
app.use(express.static(path.join(__dirname, "public")));
// HTTP logger
app.use(morgan("combined"));

//Custom my middlewar
app.use(sortMiddleware);

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icons = {
          default: "fa fa-sort",
          asc: "fa fa-angle-double-up",
          desc: "fa fa-angle-double-down",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return ` <a href="?_sort&column=${field}&type=${type}"> 
        <span class="${icon}" aria-hidden="true"></span>
        </a>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources\\views"));

/* app.get("/login", (req, res) => {
  res.render("auth/login", { showHeader: false, showFooter: false });
});

app.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  UserModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        const token = jwt.sign(
          {
            _id: data._id,
          },
          "pass"
        );
        return res.json({
          message: "Success!!",
          token: token,
        });
      } else {
        return res.json("Fail!!");
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.get(
  "/:token",
  (req, res, next) => {
    try {
      const token = req.cookies.token;
      const result = jwt.verify(token, "pass");
      if (result) {
        next();
      }
    } catch (err) {
      res.json("Bạn cần phải đăng nhập");
    }
  },
  (req, res, next) => {
    res.json("Welcome");
  }
); */

//Route init
route(app);

app.listen(port, () => {
  console.log("App listening on port ${port}");
});
