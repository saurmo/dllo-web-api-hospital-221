const { MongoClient, ObjectId } = require("mongodb")

// Connection URI
const uri = process.env.URI_MONGODB

// Create a new MongoClient
const client = new MongoClient(uri)

/**
 * Connect the client to the server
 * @returns 
 */
const connectDB = async () => {
    await client.connect();
    let DB = client.db(process.env.DB_MONGODB)
    return DB;
}

/**
 * Create a nutrition registry
 * @param {String} collectionName 
 * @param {json} information {patientIdentification, roomCode, nutritionCode, comments(optional)}
 * @returns 
 */
const createDocumentNutritionRegistry = async (collectionName, information) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    await validateInformationToRegistry(information)
    return await collection.insertOne(information)
}

/**
 * Validate if the patient, the room and the nutrition code exist
 * @param {json} information {patientIdentification, roomCode, nutritionCode, comments(optional)}
 */
const validateInformationToRegistry = async (information) => {
    if (!(await pacienteExist(information.patientIdentification))) {
        throw new Error("The patient identification doesn't exist in the database")
    }

    if (!( await roomExist(information.roomCode))) {
        throw new Error("The room code doesn't exist in the database")
    }

    if (!(await nutritionExist(information.nutritionCode))) {
        throw new Error("The nutrition code doesn't exist in the database")
    }
}

/**
 * Search for a patient with the patientIdentification of the information
 * @param {json} information {patientIdentification, roomCode, nutritionCode, comments(optional)}
 * @returns {boolean} True if exist
 */
const pacienteExist = async (information) => {
    let db = await connectDB()
    let collection = db.collection(process.env.COLLECTION_PATIENTS)
    let patient = await collection.find({idPatient:information}).toArray()
    if (patient.length == 0) {
        return false
    }
    return true
}

/**
 * Search for a room with the roomCode of the information
 * @param {json} information {patientIdentification, roomCode, nutritionCode, comments(optional)}
 * @returns {boolean} True if exist
 */
const roomExist = async (information) => {
    let db = await connectDB()
    let collection = db.collection(process.env.COLLECTION_ROOMS)
    let room = await collection.find({roomCode: information}).toArray()
    if (room.length == 0) {
        return false
    }
    return true
}

/**
 * Search for a nutrition type with the nutritionCode of the information
 * @param {json} information {patientIdentification, roomCode, nutritionCode, comments(optional)}
 * @returns {boolean} True if exist
 */
const nutritionExist = async (information) => {
    let db = await connectDB()
    let collection = db.collection(process.env.COLLECTION_NUTRITION_TYPES)
    let nutrition = await collection.find({nutritionCode: information}).toArray()
    if (nutrition.length == 0) {
        return false
    }
    return true
}

/**
 * Read all the nutrition registries
 * @param {String} collectionName 
 * @returns 
 */
const readDocumentsNutritionRegistry = async (collectionName) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    return await collection.find().toArray()
}

/**
 * Read all the registries associated with a patient
 * @param {String} collectionName 
 * @param {json} id 
 * @returns {Array} Array with the registries
 */
const readDocumentNutritionRegistryOfPatient = async (collectionName, id) => {

    if (!( await pacienteExist(id.id))){
        throw new Error("The patient identification doesn't exist in the database")
    }

    let registries = await readDocumentsNutritionRegistry(collectionName)
    let registriesArray = registries.filter((registry) => registry.patientIdentification == id.id)

    if(registriesArray.length == 0){
        throw new Error("The patient doesn't have registries in the database")
    }

    return registriesArray
}

/**
 * Search for a registry with the _id
 * @param {json} id 
 * @returns The registry with the id
 */
const readDocumentNutritionRegistry = async (id) => {
    let db = await connectDB()
    let collection = db.collection(process.env.COLLECTION_NUTRITION_REGISTRY)
    return collection.findOne(id)
}

const updateDocumentNutritionRegistry = async (collectionName, filter, newInformation) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    getFilter(filter, newInformation)
    await validateInformationToRegistry(newInformation)
    let registry = await readDocumentNutritionRegistry(filter)
    if (!registry) {
        throw new Error("The registry doesn't exist in the database")
    }
    return await collection.replaceOne(filter, newInformation)
}

/**
 * Convirtirtiendo el filtro._id en un objetoId
 * @param {*} filtro 
 * @param {*} nuevoDocumento 
 * @param {*} isHttpMethodGet Me indica si el metodo se 
 * invoca desde leerDocumentos
 */
const getFilter = (filter, newDocument) => {

    if (filter && filter._id) {
        filter._id = new ObjectId(filter._id)
        if (newDocument) {
          newDocument._id = filter._id
        }
      } else {
        throw new Error("Property _id is required.")
      }
}

const deleteDocumentNutritionRegistry = async (collectionName, filter) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    getFilter(filter)
    return await collection.deleteOne(filter)
}

module.exports = {
    createDocumentNutritionRegistry,
    readDocumentsNutritionRegistry,
    readDocumentNutritionRegistryOfPatient,
    updateDocumentNutritionRegistry,
    deleteDocumentNutritionRegistry
}
