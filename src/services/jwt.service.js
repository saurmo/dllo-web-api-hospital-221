const jwt = require('jsonwebtoken');

const PRIVATE_KEY = "jNf21HuI8UHkyijn00ND/nmAlK0eOBCQ9uC+D9a4ybeLk/lG0nn7zjJ34U0vk3tFgbhqVQXu2ayYTfDS0CvAHQ=="

/**
 * Método para generar un token
 * @param {*} data Información que guardará el token
 */
const crearToken = (data) => {
    const token = jwt.sign(data, PRIVATE_KEY, { expiresIn: "5m" })
    return token
}

/**
 * 
 * @param {*} token 
 */
const verificarToken = (token) => {
    try {
        return Object.keys(jwt.verify(token, PRIVATE_KEY)).length>0
    } catch (error) {
        return false
    }

}

/**
 * 
 * @param {*} token 
 */
const decodificarToken = (token) => {

}

module.exports = { crearToken, verificarToken, decodificarToken }