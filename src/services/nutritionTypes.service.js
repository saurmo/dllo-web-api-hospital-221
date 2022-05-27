const { MongoClient } = require("mongodb");

const uri = process.env.URI_MONGODB;

const client = new MongoClient(uri);

const conectDB = async () => {
    await client.connect();
    let DB = client.db(process.env.DB_MONGODB);
    return DB;
};

/**
 * It consults all the documents of nutrition types that are stored at mongodb
 * @param {String} collectionName 
 * @returns {Array}
 */
const consultDocumentsNutritionTypes = async (collectionName) => {
    let db = await conectDB()
    let collection = db.collection(collectionName)
    return await collection.find().toArray()
}


/**
 * It consults only one nutrition type given a nutrition code
 * @param {String} collectionName 
 * @param {String} nutritionCode 
 * @returns {Array}
 */
const consultOneDocumentNutritionType = async (collectionName, nutritionCode) => {
    let result = await findOne(collectionName, nutritionCode)
    if (result.length === 0) {
        throw new Error("The nutrition type does not exist")
    }
    return result
}


/**
 * It creates a document nutrition type in the db
 * @param {String} collectionName 
 * @param {JSON} data 
 * @returns {JSON}
 */
const createDocumentNutritionType = async (collectionName, data) => {
    let db = await conectDB()
    let collection = db.collection(collectionName)
    let nutritionCode = data.nutritionCode
    let name = data.name
    if (!validateEmptyData(data)) {
        if (nutritionCode.length === 0 || name.length === 0) {
            throw new Error("nutrition code and name are required for the nutrition type to be saved.")
        }
        result = await findOne(collectionName, nutritionCode)
        if (result.length !== 0) {
            throw new Error("The nutrition code already exists, please enter a different one.")
        }
    }
    return await collection.insertOne(data)
}


/**
 * It is used to validate if a given json is empty and throw the error
 * @param {JSON} data 
 * @returns {Boolean}
 */
const validateEmptyData = (data) => {
    if (Object.keys(data).length === 0) {
        throw new Error("You are trying to enter an empty nutrition type, please enter the nutrition code and the name at least")
    }
    return false
}


/**
 * It finds one document of nutrition type without error management
 * @param {String} collectionName 
 * @param {String} nutritionCode 
 * @returns {Array}
 */
const findOne = async (collectionName, nutritionCode) => {
    let db = await conectDB()
    let collection = db.collection(collectionName)
    let result = await collection.find({ nutritionCode: nutritionCode }).toArray()
    return result
}


/**
 * It updates a document of nutrition types at the db given the nutrition code
 * @param {String} collectionName 
 * @param {String} nutritionCode 
 * @param {JSON} data 
 * @returns {JSON}
 */
const updateDocumentNutritionType = async (collectionName, nutritionCode, data) => {
    if (!validateEmptyData(data)) {
        if(nutritionCode !== data.nutritionCode){
            throw new Error("You cannot change the nutrition code.")
        }
        result = await findOne(collectionName, nutritionCode)
        if (result.length !== 0) {
            let db = await conectDB()
            let collection = db.collection(collectionName)
            let filter = { nutritionCode: nutritionCode }
            let document = { $set: data }
            return collection.findOneAndUpdate(filter, document)
        }else{
            throw new Error("The nutrition type to be updated does not exist")    
        }
    }
}

/**
 * It deletes a document of nutrition types at the db given a nutrition code
 * @param {String} collectionName 
 * @param {String} nutritionCode 
 * @returns {JSON}
 */
const deleteDocumentNutritionType = async (collectionName, nutritionCode) => {
    if ((await consultOneDocumentNutritionType(collectionName, nutritionCode)).length === 0) {
        throw new Error("The nutrition type to be deleted does not exist")
    }
    let db = await conectDB()
    let collection = db.collection(collectionName)
    let filter = { nutritionCode: nutritionCode }
    return collection.findOneAndDelete(filter)
}


module.exports = {
    consultDocumentsNutritionTypes,
    consultOneDocumentNutritionType,
    createDocumentNutritionType,
    updateDocumentNutritionType,
    deleteDocumentNutritionType
}