const {
    consultDocumentsNutritionTypes,
    consultOneDocumentNutritionType,
    createDocumentNutritionType,
    updateDocumentNutritionType,
    deleteDocumentNutritionType } = require("../services/nutritionTypes.service");

/**
 * 
 * @param {Request} req 
 * @param {Response}res 
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
 * @param {Response}res 
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
 * @param {Response}res 
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

/**
 * 
 * @param {Request} req 
 * @param {Response}res  
 */
const updateNutritionType = async (req, res) => {

    let response = {}
    try {
        response.ok = true
        response.message = "Nutrition type updated correctly."
        let data = req.body
        let nutritionCode = req.params.nutritionCode
        let result = await updateDocumentNutritionType(process.env.COLLECTION_NUTRITION_TYPES, nutritionCode, data)
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error has ocurred updating the data."
        response.info = error.message
        res.status(500).send(response)
    }

}

/**
 * 
 * @param {Request} req 
 * @param {Response}res 
 */
const deleteNutritionType = async (req, res) => {

    let response = {}
    try {
        response.ok = true
        response.message = "Nutrition type deleted correctly."
        let data = req.body
        let nutritionCode = req.params.nutritionCode
        let result = await deleteDocumentNutritionType(process.env.COLLECTION_NUTRITION_TYPES, nutritionCode)
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error has ocurred deleting the data."
        response.info = error.message
        res.status(500).send(response)
    }

}

module.exports = {
    consultNutritionTypes,
    consultOneNutritionType,
    createNutritionType,
    updateNutritionType,
    deleteNutritionType
}