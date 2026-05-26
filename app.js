const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const userRouter = require("./routes/authRoutes");
const postRoutes=require("./routes/postRoutes");
const passportConfig = require("./config/passport");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// view engine
app.set("view engine", "ejs");

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  }),
);

// passport config
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", userRouter);
app.use("/posts",postRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// server start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
