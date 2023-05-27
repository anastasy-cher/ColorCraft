// Signin
const express = require('express');
const router = express.Router();

const passport = require('passport')
const pool = require('../config/conexion')
const encrypt = require('../config/encrypt')


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

// Recibimos datos para validar/enviar login
router.post("/login", async (req,res, next)=>{

  console.log(req.body)

  // Comprobamos email insertado en la bd
  const [email_bd] = await pool.query("select * from users where email = ?",[req.body.email])

  if (email_bd.length>0){

      const user = email_bd[0]
      // Comprobamos las contraseñas insertada y guardada en la bd
      const validar = await encrypt.desencriptar(req.body.password,user.password)

      console.log(validar)

      if (validar){
        // Pasamos los datos a estrategia en passport para crear la cookie
          await passport.authenticate("local.signin")

          (req,res,next)
          // Como no hay respuesta para .then en validar.js, entra en catch para redirigir con la cookie creada

      }else{
          console.log("Intento de iniciar sesion fallido. La contraseña incorrecta.",req.body.email)
          res.json({"error":true})
      }

  }else{
    console.log("Intento de iniciar sesion fallido. El email no existe en la BD. ",req.body.email)
    res.json({"error":true})
  }
})
module.exports = router;