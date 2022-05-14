// express framework import
const express = require('express')

const router = express.Router()

//controllers file path
const consultingRooms_ctr = require('../controllers/consultingRooms.controller')

const vs = "/api/v1"

// address routing
router.get(vs + "/consultingRooms", consultingRooms_ctr.readConsultingRooms)
    .put(vs + "/consultingRooms/:id", consultingRooms_ctr.updateConsultingRooms)
    .get(vs + "/consultingRooms/:id", consultingRooms_ctr.readConsultingRoom)
    .delete(vs + "/consultingRooms/:id", consultingRooms_ctr.deleteConsultingRooms)
    .post(vs + "/consultingRooms", consultingRooms_ctr.createConsultingRooms)

module.exports=router