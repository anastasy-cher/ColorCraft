// Signin
const express = require('express');
const router = express.Router();

const passport = require('passport')
const pool = require('../config/conexion')
const encrypt = require('../config/encrypt')
const triada = require('../public/javascripts/triada')


router.get('/acceder', function(req, res, next) {
  res.render('auth/login.ejs')
});

router.get('/usuario', async function(req, res, next) {
  const [guardadas] = await pool.query("select * from colors where id_user = ?", req.user.id)
  // console.log(guardadas)
  res.render('guardadas.ejs', {guardadas})
});

router.get('/registro', function(req, res, next) {
  res.render('auth/registro.ejs')
});

router.get('/', function(req, res, next) {
  res.render('inicio.ejs')
});

router.get('/generar', async function(req, res, next) {

// Uso de la función para generar una paleta utilizando la regla de triada
const paletaTriada = triada()
console.log(paletaTriada);



  res.render('generar.ejs', {paletaTriada})
});

// Recibimos datos de registro
router.post('/datos_registro', passport.authenticate('local.registro', {
  successRedirect:'/generar',
  failureRedirect:'/registro'
}))

router.get('/icons', function(req, res, next) {
  res.render('icons.ejs')
});
router.get('/teoria', function(req, res, next) {
  res.render('teoria.ejs')
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

router.get('/guardadas', async function(req, res, next) {

  console.log(req.query)

  const paleta = {
    color1: req.query.color0,
    color2: req.query.color1,
    color3: req.query.color2,
    color4: req.query.color3,
    id_user: req.user.id
  }
  // Prevenimos posible inyeccion a MySQL
  await pool.query("INSERT INTO colors SET ?",[paleta])

  res.redirect('/generar')
});
module.exports = router;