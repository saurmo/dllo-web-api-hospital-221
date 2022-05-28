const express = require('express')

const router = express.Router()

const ctr = require('../controllers/generic.controller');


const vs = "/api/v1"

router.get(vs + '/:collection/', ctr.getDocuments);
router.get(vs + '/:collection/:id', ctr.getDocument);
router.post(vs + '/:collection/', ctr.createDocument);
router.put(vs + '/:collection/:id', ctr.updateDocument);
router.delete(vs + '/:collection/:id', ctr.deleteDocument);



module.exports = router

