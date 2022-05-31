const { hashIsEqualsToData } = require("../../services/bcrypt.service")
const { createToken, decodeToken } = require("../../services/jwt.service")
const { getDocument } = require("../../services/mongodb.generic.service")


const login = async (req, res) => {
    let responseData = {}
    try {
        const data = req.body

        const user = await getDocument("users", { correo: data.correo })
        if (user) {
            const passwordValid = hashIsEqualsToData(data.clave, user.password)
            if (passwordValid == true) {
                // Eliminar información sensible 
                delete user.correo
                delete user.password
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
        } else {
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
    let response = {}
    try {
        const token = req.headers.token

        let tokenIsValid = decodeToken(token)
        if (tokenIsValid) {
            response.ok = true
            response.message = "Usuario verificado."
            response.info = tokenIsValid
            res.send(response)
        } else {
            response.ok = false
            response.message = "Usuario NO verificado."
            response.info = null
            res.status(401).send(response)
        }
    } catch (error) {
        response.ok = false
        response.message = "Error no controlado"
        response.info = null
        res.status(500).send(response)
    }
}

module.exports = { login, validateToken }