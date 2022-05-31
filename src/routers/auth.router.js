


// Importacion del framework de express
const express = require('express')
const { login, validateToken } = require('../controllers/auth/auth.controller')

// Instanciando un router
const router = express.Router()


const vs = "/api/v1"

router.post(`${vs}/login`, login)
router.get(vs + "/validate", validateToken)

module.exports = router
