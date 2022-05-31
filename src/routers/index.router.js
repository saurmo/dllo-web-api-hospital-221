// Importacion del framework de express
const express = require('express')

const router = express.Router()


const { requestValid } = require('../middlewares/token.middleware')
const { notFound } = require('../middlewares/404.middleware')



router.get(`/`, (req, res) => { res.send("Proyecto de aula Hospital") })

// ----  LOGIN - VALIDATE -----
const authRouter = require("./auth.router")
router.use(authRouter)

// ACTIVAR MIDDLEWARE 
router.use(requestValid)

const routerPatients = require("./Patients.routers")
const routerappointment = require("./appointment.router")
const routerAppointmentsTypes = require("./AppointmentsTypes.router")
router.use(routerPatients)
router.use(routerAppointmentsTypes)
router.use(routerappointment)

const facturationRouter = require("./facturacion.router")
const MedicalInstrumentsRouter = require("./medical_instruments.router")
const MedicamentsRouter = require("./medicaments.routers")
router.use(facturationRouter);
router.use(MedicalInstrumentsRouter);
router.use(MedicamentsRouter);


const nutritionRegistries = require('./nutrition.router')
const nutritionTypes = require("./nutritionTypes.router.js")
const rooms = require("./rooms.router.js")
router.use(nutritionRegistries)
router.use(nutritionTypes)
router.use(rooms)

const routerConsultingRooms = require("./consultingRooms.router")
const routerClinicHistories = require("./clinicHistory.router")
router.use(routerConsultingRooms)
router.use(routerClinicHistories)

// GENERIC ROUTER
const genericRouter = require("./generic.router")
router.use(genericRouter)

router.use(notFound)

module.exports = router




