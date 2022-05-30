const { hashIsEqualsToData } = require("../services/bcrypt.service")
const { createToken, decodeToken } = require("../services/jwt.service")
const { leerDocumentos } = require("../services/mongodb.service")


const login = async (req, res) => {
    let responseData = {}
    try {
        const data = req.body

        const user = await leerDocumentos("users", { correo: data.correo })
        if (user) {

            const passwordValid = hashIsEqualsToData(data.clave, user[0].password)
            if (passwordValid == true) {
                // Eliminar información sensible 
                delete user[0].correo
                delete user[0].password
                const token = createToken(user[0])
                responseData.ok = true
                responseData.message = "Bienvenido."
                responseData.info = { ...user[0], token }
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

const validateToken = (req, res) => {
    try {
        let respuesta = {};
        const token = req.headers.token;

        let tokenEsCorrecto = decodeToken(token);
        if (tokenEsCorrecto) {
            respuesta.ok = true;
            respuesta.message = "Usuario verificado";
            respuesta.info = tokenEsCorrecto;
            res.send(respuesta);
        } else {
            respuesta.ok = false;
            respuesta.message = "Usuario no verificado";
            respuesta.info = null;
            res.status(401).send(respuesta);
        }
    } catch (error) {
        respuesta.ok = false;
        respuesta.message = "Error no controlado";
        respuesta.info = null;
        res.status(500).send(respuesta);
    }

}

module.exports = { login, validateToken }