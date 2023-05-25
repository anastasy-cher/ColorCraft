// Traemos el modulo de bcrypt
const bcrypt = require('bcryptjs')

const encrypt = {}

// Password de Registro en user.js req.body.password
encrypt.encriptar = async(password) => {
    // generamos saltos
    const saltos = await bcrypt.genSalt(7)
    // generamos contaseña encripdata con los saltos
    const encriptada = await bcrypt.hash(password, saltos)

    return encriptada
}

// Password de Acceder en user.js req.body.password
encrypt.desencriptar = async(password, password_db) => {
    // Comparamos las contraseña con incriptada
    return await bcrypt.compare(password, password_db)
}
module.exports = encrypt