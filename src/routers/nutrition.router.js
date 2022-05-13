const express = require('express')

const router = express.Router()

const nutrition_ctr = require('../controllers/nutrition.controller')
const { verificarPeticion } = require('../middlewares/token.middleware')
const { notFound } = require('../middlewares/404.middleware')

const vs = "/api/v1"

//router.use(verificarPeticion)
router.get(vs + "/nutrition-registry", nutrition_ctr.ReadNutritionRegistries)
    .get(vs + "/nutrition-registry/:id", nutrition_ctr.readNutritionRegistry)
    .post(vs + "/nutrition-registry", nutrition_ctr.createNutritionRegistry)
    .put(vs + "/nutrition-registry/:id", nutrition_ctr.updateNutritionRegistry)
    .delete(vs + "/nutrition-registry", nutrition_ctr.deleteNutritionRegistry)

router.use(notFound)

module.exports = router