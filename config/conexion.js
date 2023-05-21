// Cramos la conexion a la bd y la exportamos
const mysql = require('mysql2/promise')


// traemos las bd de produccion y dev
const {db_dev, db_prod} = require('./keys')

let db_vacia

console.log("BD utilizada: ", process.env.NODE_ENV)

if(process.env.NODE_ENV == "production"){
    db_vacia = db_prod
}else{
    db_vacia = db_dev
}
// la variable se rellena de la bd elegida

// creamos la conexion con esta bd
const pool = mysql.createPool(db_vacia)

// Prueba
// siempre con async await
const prueba = async() =>{
    const [resultado] = await pool.query("SHOW TABLES;")
    console.log(resultado)
}

prueba()

module.exports = pool

