const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { check, validationResult } = require("express-validator");

const port = 15000;

app.set("views", path.join(__dirname));
app.set("view engine", "ejs");

const logger = function (req, res, next) {
  console.log("Logged");
  next();
};

app.use(logger);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/error", function (req, res, next) {
  fs.readFile("/file-does-not-exist", function (err, data) {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});

app.get("/hello/:name", (req, res) => {
  res.send("Hello " + req.params.name);
});

app.get("/form", function (req, res) {
  res.render("form");
});

app.post(
  "/user",
  [
    check("email", "Email length should be 10 to 30 characters")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("name", "Name length should be 10 to 20 characters").isLength({
      min: 10,
      max: 20,
    }),
    check("password", "Password length should be 5 to 10 characters").isLength({
      min: 5,
      max: 10,
    }),
    check("confirmpassword").isLength({ min: 5, max: 10 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      res.send("Successfully validated");
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
