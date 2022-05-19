// call the express bookstore
const express = require('express')
// call bookstore
const {CreatePatients, 
    ReadPatients, 
    ReadsPatients,
    UpdatePatients, 
    DeletePatients
    } = require("../controllers/Patients.controller");

const { verificarPeticion } = require('../middlewares/token.middleware')

const { notFound } = require('../middlewares/404.middleware')

//instanciar routers 
const router = express.Router();
//instanciar routers 
const vs = "/api/v1"

// Routes
router.get(vs + "/Patients", ReadsPatients)
    .get(vs + "/Patients/:id", ReadPatients)
    .post(vs + "/Patients", CreatePatients)
    .put(vs + "/Patients/:id", UpdatePatients)
    .delete(vs +"/Patients/:id", DeletePatients)

// export module
module.exports = router