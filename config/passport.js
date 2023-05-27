// Se encarga de crear las cookies con passport
const passport = require('passport')
const strategy = require('passport-local').Strategy

// Traemos la bd para hacer consultas
const pool = require('../config/conexion.js')

// Traemos el fichero con des/encriptacion creados en encrypt.js
const encrypt = require('./encrypt.js')

// funcion de añadir el usuario a bd + crear su cookie(registro)
passport.use('local.registro', new strategy({

    usernameField:'name',
    passwordField:'password',

    // Pasamos req abajo(como return)
    passReqToCallback:true

}, async(req, name, password, done) => {
    password = await encrypt.encriptar(password)

    // Rescatamos el email
    const user = {
        // Campo bd:valor
        name:name,
        email:req.body.email,
        password:password
    }
    const [resultado] = await pool.query('INSERT INTO USERS set ?', [user])
    
    // crear la cookie del usuario
    // Sacamos el id de la bd y se la añadimos al objeto de usuario
    user.id = resultado.insertId

    return done(null, user)
}))
// Cookie creada

// exolicar!!!
passport.use("local.signin", new strategy({
    usernameField:"email",
    passwordField:"password",
    passReqToCallback:true
}, async (req,username,password,done) =>{

    console.log(username,password)

    const [result] = await pool.query("select * from users where email = ?",[username])

    return done(null,result[0])

}))

// Pasamos la cookie al navegador
passport.serializeUser((user,done)=>{
    console.log("serial")
    done(null,user.id)
})

passport.deserializeUser(async(id,done) =>{

    console.log("deserializing")

    const [user] = await pool.query("select * from USERS where id = ?",[id])
    console.log(user[0])
    console.log(user)
    done(null,user[0])
})

