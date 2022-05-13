const express = require('express');
const router = express.Router();

const typesNutritionCtr = require("../controllers/nutrition.controller");

const vs = "/api/v1";

router.get(vs + "/nutrition-types", typesNutritionCtr.consultNutritionTypes)
    .get(vs + "/nutrition-types/:nutritionCode", typesNutritionCtr.consultOneNutritionType)
    .post(vs + "/nutrition-types", typesNutritionCtr.createNutritionType)
    // .put(vs + "/nutrition-types/:id", typesNutritionCtr.consultTypesNutrition)
    // .delete(vs + "/nutrition-types/:id", typesNutritionCtr.consultTypesNutrition)

module.exports = router;