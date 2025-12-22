if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const ExpressError = require("./utils/ExpressError.js");
const User = require("./modules/user.js");

const listingRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const app = express();

// ===== View Engine =====
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== Middleware =====
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ===== MongoDB Connection =====
const dbURL = process.env.ATLASDB_URL;
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// ===== Session =====
const store = MongoStore.create({ mongoUrl: dbURL, crypto: { secret: process.env.SECRET } });
store.on("error", (err) => console.error("Session store error:", err));

app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true },
  })
);
app.use(flash());

// ===== Passport =====
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===== Flash & Current User =====
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ===== Routes =====
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

app.get("/", (req, res) => res.redirect("/listings"));

// ===== 404 & Error Handler =====
app.all("*", (req, res, next) => next(new ExpressError(404, "Page Not Found")));
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).render("error", { err });
});

// ===== Start Server =====
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

