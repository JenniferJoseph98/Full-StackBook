const signinroutes = require("express").Router();
const { tokenGenerator, tokenValidator } = require("../bcrypt/token");

const { hashValidator, hashGenerate } = require("../bcrypt/hashpassword");
const User = require("../model/userinfo");
signinroutes.post("/login", async (req, res) => {
  try {
    const existinguser = await User.findOne({ username: req.body.username });
    const passwordValidation = await hashValidator(
      req.body.password,
      existinguser.password
    );
    console.log(
      passwordValidation,
      existinguser.username === req.body.username
    );
    if (passwordValidation && existinguser.username === req.body.username) {
      const token = tokenGenerator(existinguser.username);
      res.status(200).json({
        message: "Login Successfully",
        user: existinguser._id,
        token,
      });
    } else {
      res.status(400).send("Username and password not matching");
    }
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});
signinroutes.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const existinguser = await User.findOne({ username: req.body.username });
    console.log(existinguser);
    if (!existinguser) {
      const hashpassword = await hashGenerate(req.body.password);
      const user = await User.create({
        username: req.body.username,
        password: hashpassword,
      });
      res.status(200);
      res.send(user);
    } else {
      res.status(400);
      res.send("Name already exist");
    }
  } catch (e) {
    res.status(400);
    res.send(e);
  }
});

module.exports = signinroutes;
