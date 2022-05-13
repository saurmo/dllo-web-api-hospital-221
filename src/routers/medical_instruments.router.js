// Importacion del framework de express
const express = require('express')

// Instanciando un router
const router = express.Router()

// Importar controladores
const medical_instruments_ctr = require("../controllers/medical_instruments.controller")

// Definicion de los endpoints - rutas
const vs = "/api/v1"

router.get(vs + "/medical_instruments", medical_instruments_ctr.consultMedicalInstruments)
router.get(vs + "/medical_instruments/:id", medical_instruments_ctr.consultMedicalInstrument)
router.post(vs + "/medical_instruments", medical_instruments_ctr.createMedicalInstrument)
router.put(vs + "/medical_instruments/:id", medical_instruments_ctr.updateMedicalInstrument)
router.delete(vs + "/medical_instruments/:id", medical_instruments_ctr.deleteMedicalInstrument)

// router.use(notFound)

module.exports = router
