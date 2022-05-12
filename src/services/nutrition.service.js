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
    validateInformationToRegistry(information)
    return await collection.insertOne(information)
}

const validateInformationToRegistry = (information) => {

    if (!(pacienteExist(information.pacientIdentification))) {
        throw new Error("The patient identification doesn't exist in the database")
    }

    if (!(roomExist(information.roomCode))) {
        throw new Error("The room code doesn't exist in the database")
    }

    if (!(nutritionExist(information.nutritionCode))) {
        throw new Error("The nutrition code doesn't exist in the database")
    }
}

const pacienteExist = (information) => {
    let db = await conectionDB()
    let collection = db.collection(process.env.COLLECTION_PATIENTS)
    let patients = await collection.find().toArray()
    let patient = patients.filter((patient) => patient.idPatient == information)
    if (patient.length == 0) {
        return false
    }
    return true
}

const roomExist = (information) => {
    let db = await conectionDB()
    let collection = db.collection(process.env.COLLECTION_ROOMS)
    let rooms = await collection.find().toArray()
    let room = rooms.filter((room) => room.roomCode == information)
    if (room.length == 0) {
        return false
    }
    return true
}

const nutritionExist = (information) => {
    let db = await conectionDB()
    let collection = db.collection(process.env.COLLECTION_ROOMS)
    let nutritions = await collection.find().toArray()
    let nutrition = nutritions.filter((nutrition) => nutrition.nutritionCode == information)
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

    if (!(pacienteExist(id.id))){
        throw new Error("The patient identification doesn't exist in the database")
    }

    let registriesArray = []
    let registries = await readDocumentsNutritionRegistry(collectionName)

    registriesArray = registries.filter((registry) => registry.pacientIdentification == id.id)

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
