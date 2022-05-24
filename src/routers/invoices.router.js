// Importacion del framework de express
const express = require('express')

const router = express.Router()

const invoices_controller = require('../controllers/invoices.controller');

// const auth_ctr = require("../controllers/auth.controller")
// const { requestValid } = require('../middlewares/token.middleware')
// const { notFound } = require('../middlewares/404.middleware')

const vs = "/api/v1"

router.get(vs + '/invoices/', invoices_controller.getBills);
router.get(vs + '/invoices/:id', invoices_controller.getBill);
router.post(vs + '/invoices/', invoices_controller.createBill);
router.put(vs + '/invoices/:id', invoices_controller.updateBill);
router.delete(vs + '/invoices/:id', invoices_controller.deleteBill);

//router.use(requestValid)

// router.use(notFound)

module.exports = router

