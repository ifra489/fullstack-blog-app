const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.getLogin = (req, res) => {
  res.render("login.ejs",{
    title: "Login",
    user:req.user,
    error:null

  });

};

exports.Login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.render("login", {
        title: "Login",
        user:req.user,
        error: info.message,
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.redirect("/");
    });
  })(req, res, next);
};


exports.getRegister = (req, res) => {
  res.render("register",{
    title: "Register",
    user:req.user,
    error:null});
};

exports.Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.render("register",{
        title: "Register",
        user:req.user,
        error: "Email already in use",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
const user=await User.create({ username, email, password: hashedPassword });
    res.redirect("/login");
  } catch (err) {
    res.render("register", {
        title: "Register",
        user:req.user,
        error: err.message,
      });
  }
};
exports.Logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/login");
  });
};
exports.home = (req, res) => {
  res.render("home", {
    title: "Home",
    user: req.user,
  });
};