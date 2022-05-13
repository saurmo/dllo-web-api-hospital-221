// Importacion del framework de express
const express = require('express')

const router = express.Router()

const consultingRooms_ctr = require("../controllers/consultingRooms.controller")

const vs = "/api/v1"

router.get(vs + "/consultingRooms", consultingRooms_ctr.consultingRooms_ctr)
    .put(vs + "/consultingRooms/:id", consultingRoom_ctr.updateConsultingRoom)
    .get(vs + "/consultingRooms/:id", consultingRoom_ctr.consultingRoom_ctr)
    .delete(vs + "/consultingRooms/:id", consultingRoom_ctr.deleteConsultingRoom)
    .post(vs + "/consultingRooms", consultingRoom_ctr.createConsultingRoom)


