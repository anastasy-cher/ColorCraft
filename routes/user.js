// Signin
const express = require('express');
const router = express.Router();


router.get('/login', function(req, res, next) {
  res.render('auth/login.ejs')
});

router.get('/signup', function(req, res, next) {
  res.render('auth/signup.ejs')
});

module.exports = router;