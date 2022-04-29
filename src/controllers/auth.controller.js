const { compararHash } = require("../services/bcrypt.service")
const { crearToken } = require("../services/jwt.service")
const { leerDocumento } = require("../services/mongodb.service")


const login = async (req, res) => {
    let respuesta = {}
    try {
        const credenciales = req.body

        const usuario = await leerDocumento("usuarios", { correo: credenciales.correo })
        if (usuario) {

            const claveEsIgual = compararHash(credenciales.clave, usuario.clave)
            if (claveEsIgual == true) {
                // Eliminar información sensible 

                delete usuario.correo
                delete usuario.clave

                const token = crearToken(usuario)

                respuesta.ok = true
                respuesta.message = "Bienvenido"
                respuesta.info = { ...usuario, token }
                res.send(respuesta)
            } else {
                respuesta.ok = false
                respuesta.message = "Clave incorrecta"
                respuesta.info = null
                res.send(respuesta)
            }
        }  else {
            respuesta.ok = false
            respuesta.message = "Usuario no existe."
            respuesta.info = null
            res.send(respuesta)
        }

    } catch (error) {
        console.error(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error realizando login"
        respuesta.info = error
        res.status(500).send(respuesta)
    }



}

module.exports = { login }