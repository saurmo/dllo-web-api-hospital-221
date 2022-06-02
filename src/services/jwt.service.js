const jwt = require('jsonwebtoken');

const PRIVATE_KEY = "jNf21HuI8UHkyijn00ND/nmAlK0eOBCQ9uC+D9a4ybeLk/lG0nn7zjJ34U0vk3tFgbhqVQXu2ayYTfDS0CvAHQ=="

/**
 * Generar un token 
 * @param {*} payload Información que guardará el token
 * @returns String
 */
const createToken = (payload) => {
    const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: "1000m" })
    return token
}

/**
 * Verificar si un token es correcto
 * @param {*} token 
 * @returns Boolean
 */
const verifyToken = (token) => {
    try {
        return Object.keys(jwt.verify(token, PRIVATE_KEY)).length > 0
    } catch (error) {
        return false
    }
}

/**
 * 
 * @param {*} token 
 */
const decodeToken = (token) => {

    return jwt.verify(token, PRIVATE_KEY);
}


module.exports = { createToken, verifyToken, decodeToken }