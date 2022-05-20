// Importacion del framework de express
const express = require('express')

const router = express.Router()

const   Hall_ctr = require("../controllers/Hall.controller")

const vs = "/api/v1"

router.get(vs + "/Halls",  Hall_ctr.readhall)
    .put(vs + "/Halls/:id", Hall_ctr.updateHall)
    .get(vs + "/Halls/:id",  Hall_ctr.readHalls)
    .delete(vs + "/Halls/:id",  Hall_ctr.deleteHall)
    .post(vs + "/Halls", Hall_ctr.createHall)


module.exports=router



