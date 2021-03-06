const express = require('express');
const router = express.Router();

const typesNutritionCtr = require("../controllers/nutritionTypes.controller");

const vs = "/api/v1";

router.get(vs + "/nutrition-types", typesNutritionCtr.consultNutritionTypes)
    .get(vs + "/nutrition-types/:nutritionCode", typesNutritionCtr.consultOneNutritionType)
    .post(vs + "/nutrition-types", typesNutritionCtr.createNutritionType)
    .put(vs + "/nutrition-types/:nutritionCode", typesNutritionCtr.updateNutritionType)
    .delete(vs + "/nutrition-types/:nutritionCode", typesNutritionCtr.deleteNutritionType)

module.exports = router;