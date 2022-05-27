// Importacion del framework de express
const express = require('express')

const router = express.Router()

const medicaments_controller = require('../controllers/medicaments.controller');

// const auth_ctr = require("../controllers/auth.controller")
// const { requestValid } = require('../middlewares/token.middleware')
// const { notFound } = require('../middlewares/404.middleware')

const vs = "/api/v1"

router.get(vs + '/medicaments', medicaments_controller.getMedicamentsControllers);
router.get(vs + '/medicaments/:id', medicaments_controller.getMedicamentController);
router.post(vs + '/medicaments', medicaments_controller.createMedicamentController);
router.put(vs + '/medicaments/:id', medicaments_controller.updateMedicamentController);
router.delete(vs + '/medicaments/:id', medicaments_controller.deleteMedicamentController);

//router.use(requestValid)

// router.use(notFound)

module.exports = router