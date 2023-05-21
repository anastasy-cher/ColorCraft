// dotenv - para poder acceder a las variables ocultas .env
require('dotenv').config()

module.exports = {
    db_dev:{
        host:process.env.MYSQL_HOST,
        database:process.env.MYSQL_DB,
        user:process.env.MYSQL_USER,
        port:process.env.MYSQL_PORT,
        password:process.env.MYSQL_PASSWORD
    },
    db_prod:{
        host:process.env.MYSQL_ADDON_HOST,
        database:process.env.MYSQL_ADDON_DB,
        user:process.env.MYSQL_ADDON_USER,
        port:process.env.MYSQL_ADDON_PORT,
        password:process.env.MYSQL_ADDON_PASSWORD
    },

}
