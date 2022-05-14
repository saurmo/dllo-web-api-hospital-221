const express = require('express')
const {CreatePatients, 
    ReadPatients, 
    ReadsPatients,
    UpdatePatients, 
    DeletePatients
    } = require("../controllers/Patients.controller");

const { verificarPeticion } = require('../middlewares/token.middleware')

const { notFound } = require('../middlewares/404.middleware')

const router = express.Router();
const vs = "/api/v1"

// Routes
router.get(vs + "/Patients", ReadsPatients)
    .get(vs + "/Patients/:id", ReadPatients)
    .post(vs + "/Patients", CreatePatients)
    .put(vs + "/Patients/:id", UpdatePatients)
    .delete(vs +"/Patients/:id", DeletePatients)

module.exports = router