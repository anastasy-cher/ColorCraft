// Se encarga de crear las cookies con passport
const passport = require('passport')
const strategy = require('passport-local').Strategy
const nodemailer = require('nodemailer')

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
    
    // Enviamos el email de bienvenida
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "chernykhanastasia96@gmail.com",
            pass: process.env.EMAIL,
        }
    });

    let info = await transporter.sendMail({
        from: req.body.email + ' <chernykhanastasia96@gmail.com>',
        to: req.body.email,
        subject:` ¡Bienvenido ${name}!`,
        html: `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Bienvenido a nuestro generador de paletas de colores</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f1f1f1;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
        
                h1 {
                    color: #333333;
                }
        
                p {
                    color: #666666;
                    margin-bottom: 20px;
                }
        
                .cta-button {
                    text-decoration: none;
                    display: inline-block;
                    margin-top: 30px;
                    padding: 12px 24px;
                    background-color: #ffffff;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                    border: 1px solid blue;
                }
        
                
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Bienvenido ${name} a nuestro generador de paletas de colores</h1>
                <p>¡Gracias por unirte a nuestra comunidad! Estamos emocionados de tenerte a bordo.</p>
                <p>Con nuestro generador de paletas de colores, podrás explorar y crear combinaciones de colores sorprendentes para tus proyectos de diseño.</p>
                <p>¡Comienza a crear tus paletas de colores hoy mismo y lleva tus diseños al siguiente nivel!</p>
                <a href="https://colorcraft.onrender.com" class="cta-button">Crear paletas de colores</a>
            </div>
        </body>
        </html>`
      });

    console.log("Message sent: ", info.messageId);
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

