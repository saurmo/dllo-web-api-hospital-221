// call the express bookstore
const express = require('express')
// call bookstore
const {CreateAppointmentsTypes, 
    ReadAppointmentsTypes, 
    ReadsAppointmentsTypes,
    UpdateAppointmentsTypes, 
    DeleteAppointmentsTypes
    } = require("../controllers/AppointmentsTypes.controller");

const { verificarPeticion } = require('../middlewares/token.middleware')

const { notFound } = require('../middlewares/404.middleware')

//instanciar routers
const router = express.Router();
//instanciar routers
const vs = "/api/v1"

// Routes
router.get(vs + "/AppointmentsTypes", ReadsAppointmentsTypes)
    .get(vs + "/AppointmentsTypes/:id", ReadAppointmentsTypes)
    .post(vs + "/AppointmentsTypes", CreateAppointmentsTypes)
    .put(vs + "/AppointmentsTypes/:id", UpdateAppointmentsTypes)
    .delete(vs +"/AppointmentsTypes/:id", DeleteAppointmentsTypes)

// export module
module.exports = router
    