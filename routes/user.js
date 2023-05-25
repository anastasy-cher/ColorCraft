// Signin
const express = require('express');
const router = express.Router();

const passport = require('passport')


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
router.post('/datos_registro', passport.authenticate('local.registro', {
  successRedirect:'/generar',
  failureRedirect:'/registro'
}))
router.get('/corporativo', function(req, res, next) {
  res.render('corporativo.ejs')
});
router.get('/icons', function(req, res, next) {
  res.render('icons.ejs')
});
router.get('/teoria', function(req, res, next) {
  res.render('teoria.ejs')
});
router.get('/web', function(req, res, next) {
  res.render('web.ejs')
});
router.get("/logout" ,(req,res) =>{
  req.logOut( function(err){
    if(err){
      return next(err)
    }
  })
  res.redirect("/")
})


module.exports = router;