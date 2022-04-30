// Importacion del framework de express
const express = require('express')

const router = express.Router()

const auth_ctr = require("../controllers/auth.controller")
const { verificarPeticion } = require('../middlewares/token.middleware')
const { notFound } = require('../middlewares/404.middleware')
const entrance_ctr = require("../controllers/entrance.controller")

const vs = "/api/v1"

router.get(`/`, (req, res)=>{
    res.send("Proyecto de aula Hospital")
})

router.use(verificarPeticion)

router.get(vs + "/entrance", entrance_ctr.getLogin)
    .put(vs + "/entrance/:id", entrance_ctr.updateLogin)
    .get(vs + "/entrance/:id", entrance_ctr.getLogins)
    .delete(vs + "/entrance/:id", entrance_ctr.deleteLogin)
    .post(vs + "/entrance", entrance_ctr.createLogin)

router.use(verificarPeticion)

router.use(notFound)

module.exports = router




