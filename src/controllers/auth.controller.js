const { hashIsEqualsToData } = require("../services/bcrypt.service")
const { createToken } = require("../services/jwt.service")
//const { getDocument } = require("../services/mongodb.service")


const login = async (req, res) => {
    let responseData = {}
    try {
        const data = req.body

        const user = await getDocument("usuarios", { correo: data.correo })
        if (user) {

            const passwordValid = hashIsEqualsToData(data.clave, user.clave)
            if (passwordValid == true) {
                // Eliminar información sensible 
                delete user.correo
                delete user.clave
                const token = createToken(user)
                responseData.ok = true
                responseData.message = "Bienvenido."
                responseData.info = { ...user, token }
                res.send(responseData)
            } else {
                responseData.ok = false
                responseData.message = "Clave incorrecta"
                responseData.info = null
                res.send(responseData)
            }
        }  else {
            responseData.ok = false
            responseData.message = "Usuario no existe."
            responseData.info = null
            res.send(responseData)
        }

    } catch (error) {
        console.error(error);
        responseData.ok = false
        responseData.message = "Ha ocurrido un error realizando login"
        responseData.info = error
        res.status(500).send(responseData)
    }



}

module.exports = { login }