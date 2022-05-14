const express = require('express')
const {CreateAppointmentsTypes, 
    ReadAppointmentsTypes, 
    ReadsAppointmentsTypes,
    UpdateAppointmentsTypes, 
    DeleteAppointmentsTypes
    } = require("../controllers/AppointmentsTypes.controller");

const { verificarPeticion } = require('../middlewares/token.middleware')

const { notFound } = require('../middlewares/404.middleware')

const router = express.Router();
const vs = "/api/v1"

// Routes
router.get(vs + "/AppointmentsTypes", ReadsAppointmentsTypes)
    .get(vs + "/AppointmentsTypes/:id", ReadAppointmentsTypes)
    .post(vs + "/AppointmentsTypes", CreateAppointmentsTypes)
    .put(vs + "/AppointmentsTypes/:id", UpdateAppointmentsTypes)
    .delete(vs +"/AppointmentsTypes/:id", DeleteAppointmentsTypes)

module.exports = router
    