require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
let USER=null;

const verifyToken = (req, res, next) => {
  let token = req.cookies.jwt;
  // COOKIE PARSER GIVES YOU A .cookies PROP, WE NAMED OUR TOKEN jwt

  console.log("Cookies: ", req.cookies.jwt);

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err || !decodedUser) {
      return res.status(401).json({ error: "Unauthorized Request" });
    }
    req.user = decodedUser;
    // ADDS A .user PROP TO REQ FOR TOKEN USER
    console.log(decodedUser);

    next();
  });
};

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

// HOMEPAGE
app.get("/", (req, res) => {
  res.render("users/index.ejs");
});

app.use("/auth", require("./controllers/authController.js"));
app.use("/users", require("./controllers/usersController.js"));
app.use("/main", require("./controllers/mainController.js"));
app.use("/recipe", require("./controllers/recipeController.js"));
app.use("/ingre", require("./controllers/ingreController.js"));
app.use("/prep", require("./controllers/prepController.js"));
app.use("/step", require("./controllers/stepController.js"));
app.use("/prepIngre", require("./controllers/prepIngreController.js"));
app.use("/prepStep", require("./controllers/prepStepController.js"));

app.listen(process.env.PORT, () => {
  console.log("Nodemon listening");
});



