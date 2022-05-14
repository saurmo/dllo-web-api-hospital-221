// Importacion del framework de express
const express = require('express')

const router = express.Router()
const routerConsultingRooms = require("./consultingRooms.router")


router.use(routerConsultingRooms)

module.exports = router




