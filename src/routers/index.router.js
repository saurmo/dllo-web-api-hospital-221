// Importacion del framework de express
const express = require('express')

const router = express.Router()
const routerConsultingRooms = require("./consultingRooms.router")
const routerClinicHistories = require("./clinicHistory.router")

const auth_ctr = require("../controllers/auth/auth.controller")
const { requestValid } = require('../middlewares/token.middleware')
const { notFound } = require('../middlewares/404.middleware')
//const clinicHistory_ctr = require("../controllers/clinicHistory.controller")
const nutritionRegistries = require('./nutrition.router')
const nutritionTypes = require("./nutritionTypes.router.js")
const rooms = require("./rooms.router.js")

const vs = "/api/v1"

router.get(`/`, (req, res)=>{
    res.send("Proyecto de aula Hospital")
})

//router.use(requestValid)

router.use(nutritionRegistries)
router.use(nutritionTypes)
router.use(rooms)

router.use(routerConsultingRooms)
router.use(routerClinicHistories)

router.use(notFound)

module.exports = router




