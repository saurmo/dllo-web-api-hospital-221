// Importacion del framework de express
const express = require('express')

const router = express.Router()

const clinicHistory_ctr = require("../controllers/clinicHistory.controller")

const vs = "/api/v1"

router.get(vs + "/clinicHistorys", clinicHistory_ctr.readClinicHistorys)
    .put(vs + "/clinicHistorys/:id", clinicHistory_ctr.updateClinicHistory)
    .get(vs + "/clinicHistorys/:id", clinicHistory_ctr.readClinicHistory)
    .delete(vs + "/clinicHistorys/:id", clinicHistory_ctr.deleteClinicHistory)
    .post(vs + "/clinicHistorys", clinicHistory_ctr.createClinicHistory)

module.exports = router