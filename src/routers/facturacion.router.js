// Importacion del framework de express
const express = require('express')

const router = express.Router()

const facture_controller = require('../controllers/facture.controller');

// const auth_ctr = require("../controllers/auth.controller")
// const { requestValid } = require('../middlewares/token.middleware')
// const { notFound } = require('../middlewares/404.middleware')

const vs = "/api/v1"

router.get(vs + '/factures/', facture_controller.getBills);
router.get(vs + '/factures/:id', facture_controller.getBill);
router.post(vs + '/factures/', facture_controller.createBill);
router.put(vs + '/factures/:id', facture_controller.updateBill);

//router.use(requestValid)

// router.use(notFound)

module.exports = router

