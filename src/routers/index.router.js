// Importacion del framework de express
const express = require('express')

const router = express.Router()


const auth_ctr = require("../controllers/auth.controller")
const { requestValid } = require('../middlewares/token.middleware')
const { notFound } = require('../middlewares/404.middleware')
const consultingRooms_ctr = require("../controllers/consultingRooms.controller")
const clinicHistory_ctr = require("../controllers/clinicHistory.controller")

const vs = "/api/v1"

router.get(`/`, (req, res)=>{
    res.send("Proyecto de aula Hospital")
})

//router.use(requestValid)

router.get(vs + "/clinicHistory", clinicHistory_ctr.getLogin)
    .put(vs + "/clinicHistory/:id", clinicHistory_ctr.updateLogin)
    .get(vs + "/clinicHistory/:id", clinicHistory_ctr.getLogins)
    .delete(vs + "/clinicHistory/:id", clinicHistory_ctr.deleteLogin)
    .post(vs + "/clinicHistory", clinicHistory_ctr.createLogin)


// router.get(vs + "/consultingRooms", consultingRooms_ctr.consultingRooms_ctr)
//     .put(vs + "/consultingRooms/:id", consultingRoom_ctr.updateConsultingRoom)
//     .get(vs + "/consultingRooms/:id", consultingRoom_ctr.consultingRoom_ctr)
//     .delete(vs + "/consultingRooms/:id", consultingRoom_ctr.deleteConsultingRoom)
//     .post(vs + "/consultingRooms", consultingRoom_ctr.createConsultingRoom)

router.use(notFound)

module.exports = router




