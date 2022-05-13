const { MongoClient, ObjectId } = require("mongodb")

// Connection URI
const uri = process.env.URI_MONGODB

// Create a new MongoClient
const client = new MongoClient(uri)

const conectionDB = async () => {
    // Connect the client to the server
    await client.connect();
    let DB = client.db(process.env.DB_MONGODB)
    return DB
}

const createDocumentNutritionRegistry = async (collectionName, information) => {
    let db = await conectionDB()
    let collection = db.collection(collectionName)
    await validateInformationToRegistry(information)
    return await collection.insertOne(information)
}

const validateInformationToRegistry = async (information) => {
    if (!(await pacienteExist(information.patientIdentification))) {
        throw new Error("The patient identification doesn't exist in the database")
    }

    // if (!( await roomExist(information.roomCode))) {
    //     throw new Error("The room code doesn't exist in the database")
    // }

    if (!(await nutritionExist(information.nutritionCode))) {
        throw new Error("The nutrition code doesn't exist in the database")
    }
}

const pacienteExist = async (information) => {
    let db = await conectionDB()
    let collection = db.collection(process.env.COLLECTION_PATIENTS)
    let patient = await collection.find({idPatient:information}).toArray()
    if (patient.length == 0) {
        return false
    }
    return true
}

const roomExist = async (information) => {
    let db = await conectionDB()
    let collection = db.collection(process.env.COLLECTION_ROOMS)
    let room = await collection.find({roomCode: information}).toArray()
    if (room.length == 0) {
        return false
    }
    return true
}

const nutritionExist = async (information) => {
    let db = await conectionDB()
    let collection = db.collection(process.env.COLLECTION_NUTRITION_TYPES)
    let nutrition = await collection.find({nutritionCode: information}).toArray()
    console.log(nutrition);
    if (nutrition.length == 0) {
        return false
    }
    return true
}

const readDocumentsNutritionRegistry = async (collectionName) => {
    let db = await conectionDB()
    let collection = db.collection(collectionName)
    return await collection.find().toArray()
}

const readDocumentNutritionRegistry = async (collectionName, id) => {

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

const updateDocumentNutritionRegistry = async (collectionName) => {
    let db = await conectionDB()
    let collection = db.collection(collectionName)
    return
}

const deleteDocumentNutritionRegistry = async (collectionName) => {
    let db = await conectionDB()
    let collection = db.collection(collectionName)
    return
}

module.exports = {
    createDocumentNutritionRegistry,
    readDocumentsNutritionRegistry,
    readDocumentNutritionRegistry,
    updateDocumentNutritionRegistry,
    deleteDocumentNutritionRegistry
}
