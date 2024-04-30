const express = require("express");
const router = express.Router();
const usable = require("../controllers/usable");
const authController = require("../controllers/auth");

router.get("/", authController.isLoggedIn, (req, res) => {
  res.render("index1", {
    user: req.user,
  });
});

router.get("/api/getdata", usable.fetchLanguageData, (req, res) => {
  const languageData = req.languageData;
  res.json(languageData);
});

router.post("/api/postData", usable.translate);

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("profile", {
      user: req.user,
    });
  } else {
    res.redirect("/");
  }
  
})

module.exports = router;
