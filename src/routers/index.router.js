// Importacion del framework de express
const express = require('express')

const router = express.Router()


const auth_ctr = require("../controllers/auth.controller")
const { requestValid } = require('../middlewares/token.middleware')
const { notFound } = require('../middlewares/404.middleware')


const vs = "/api/v1"

router.get(`/`, (req, res)=>{
    res.send("Proyecto de aula Hospital")
})

router.use(requestValid)


router.use(notFound)

module.exports = router




