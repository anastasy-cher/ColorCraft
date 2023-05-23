// Signin
const express = require('express');
const router = express.Router();


router.get('/acceder', function(req, res, next) {
  res.render('auth/login.ejs')
});

router.get('/registro', function(req, res, next) {
  res.render('auth/registro.ejs')
});

router.get('/', function(req, res, next) {
  res.render('inicio.ejs')
});

router.get('/generar', function(req, res, next) {
  res.render('generar.ejs')
});

// Recibimos datos de registro
router.post('/datos_registro', function(req, res, next) {
  console.log(req.body)
})

module.exports = router;