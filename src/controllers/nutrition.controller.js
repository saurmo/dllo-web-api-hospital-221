const {
    createDocumentNutritionRegistry,
    readDocumentsNutritionRegistry,
    readDocumentNutritionRegistry,
    updateDocumentNutritionRegistry,
    deleteDocumentNutritionRegistry
} = require("../services/nutrition.service")

/**
* 
* @param {Request} req 
* @param {Response}res 
*/
const createNutritionRegistry = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "Registry created successfully"
        let information = req.body
        await createDocumentNutritionRegistry(process.env.COLLECTION_NUTRITION_REGISTRY, 
            information)
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred creating the registry"
        response.info = error.message
        res.status(500).send(response)
    }

}

/**
* 
* @param {Request} req 
* @param {Response}res 
*/
const ReadNutritionRegistries = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "Registries read successfully"
        let result = await readDocumentsNutritionRegistry(process.env.COLLECTION_NUTRITION_REGISTRY)
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred reading the registries"
        response.info = error.message
        res.status(500).send(response)
    }

}


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const readNutritionRegistry = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "Registry read successfully"
        let id = req.params.id
        let result = await readDocumentNutritionRegistry(process.env.COLLECTION_NUTRITION_REGISTRY,
            { id })
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred reading the registry"
        response.info = error.message
        res.status(500).send(response)
    }

}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const updateNutritionRegistry = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "Registry updated successfully"
        let id = req.params.id
        let information = req.body
        let result = await updateDocumentNutritionRegistry(process.env.COLLECTION_NUTRITION_REGISTRY,
            { id }, information)
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred updating the registry"
        response.info = error.message
        res.status(500).send(response)
    }
}


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteNutritionRegistry = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "Registry deleted successfully"
        let id = req.params.id
        let result = await deleteDocumentNutritionRegistry(process.env.COLLECTION_NUTRITION_REGISTRY,{ id })
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred deleting the registry"
        response.info = error.message
        res.status(500).send(response)
    }
}

module.exports = {
    createNutritionRegistry,
    ReadNutritionRegistries,
    readNutritionRegistry,
    updateNutritionRegistry,
    deleteNutritionRegistry
}