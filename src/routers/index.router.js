// Importacion del framework de express
const express = require('express')

const router = express.Router()
const routerConsultingRooms = require("./consultingRooms.router")
const routerClinicHistories = require("./clinicHistory.router")

router.use(routerConsultingRooms)
router.use(routerClinicHistories)

module.exports = router




