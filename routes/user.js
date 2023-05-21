// Signin
const express = require('express');
const router = express.Router();


router.get('/login', function(req, res, next) {
  res.render('auth/login.ejs')
});

router.get('/registrarse', function(req, res, next) {
  res.render('auth/registro.ejs')
});

router.get('/', function(req, res, next) {
  res.render('inicio.ejs')
});

router.get('/generar', function(req, res, next) {
  res.render('generar.ejs')
});

module.exports = router;