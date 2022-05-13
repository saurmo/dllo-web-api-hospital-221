const {
    consultDocumentsNutritionTypes,
    consultOneDocumentNutritionType,
    createDocumentNutritionType } = require("../services/nutrition.service");

/**
 * 
 * @param {Request} req 
 * @param {Repsonse}res 
 */
const consultNutritionTypes = async (req, res) => {

    let response = {}
    try {
        response.ok = true
        response.message = "Nutrition types returned correctly."
        let result = await consultDocumentsNutritionTypes(process.env.COLLECTION_NUTRITION_TYPES)
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error has ocurred returning the data."
        response.info = error.message
        res.status(500).send(response)
    }

}

/**
 * 
 * @param {Request} req 
 * @param {Repsonse}res 
 */
 const consultOneNutritionType = async (req, res) => {

    let response = {}
    try {
        response.ok = true
        response.message = "Nutrition type returned correctly."
        let nutritionCode = req.params.nutritionCode
        let result = await consultOneDocumentNutritionType(process.env.COLLECTION_NUTRITION_TYPES, nutritionCode)
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error has ocurred while returning the data."
        response.info = error.message
        res.status(500).send(response)
    }

}

/**
 * 
 * @param {Request} req 
 * @param {Repsonse}res 
 */
 const createNutritionType = async (req, res) => {

    let response = {}
    try {
        response.ok = true
        response.message = "Nutrition type created correctly."
        let data = req.body
        let result = await createDocumentNutritionType(process.env.COLLECTION_NUTRITION_TYPES, data)
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error has ocurred creating the data."
        response.info = error.message
        res.status(500).send(response)
    }

}

module.exports = { 
    consultNutritionTypes,
    consultOneNutritionType, 
    createNutritionType }