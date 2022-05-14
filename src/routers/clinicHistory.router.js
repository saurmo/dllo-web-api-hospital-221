// Importacion del framework de express
const express = require('express')

const router = express.Router()


//controllers file path
const clinicHistory_ctr = require("../controllers/clinicHistory.controller")

const vs = "/api/v1"

// address routing
router.get(vs + "/clinicHistorys", clinicHistory_ctr.readClinicHistorys)
    .put(vs + "/clinicHistorys/:id", clinicHistory_ctr.updateClinicHistory)
    .get(vs + "/clinicHistorys/:id", clinicHistory_ctr.readClinicHistory)
    .delete(vs + "/clinicHistorys/:id", clinicHistory_ctr.deleteClinicHistory)
    .post(vs + "/clinicHistorys", clinicHistory_ctr.createClinicHistory)

module.exports = router