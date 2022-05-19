// call bookstore
const { CreateAppointments, ReadAppointments, ReadsAppointments, UpdateAppointments, DeleteAppointments } = require("../controllers/appointment.controllers");

const { verificarPeticion } = require('../middlewares/token.middleware')

const { notFound } = require('../middlewares/404.middleware')

//instanciar routers 
const router = express.Router();
//instanciar routers
const vs = "/api/v1"

// Routes
router.get(vs + "/Appointments", ReadsAppointments)
    .get(vs + "/Appointments/:id", ReadAppointments)
    .post(vs + "/Appointments", CreateAppointments)
    .put(vs + "/Appointments/:id", UpdateAppointments)
    .delete(vs + "/Appointments/:id", DeleteAppointments)


// export module
module.exports = router
