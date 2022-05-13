const { MongoClient } = require("mongodb");

const uri = process.env.URI_MONGODB;

const client = new MongoClient(uri);

const conectDB = async () => {
    await client.connect();
    let DB = client.db(process.env.DB_MONGODB);
    return DB;
};

const consultDocumentsNutritionTypes = async (collectionName) => {
    let db = await conectDB()
    let collection = db.collection(collectionName)
    return await collection.find().toArray()
}

const consultOneDocumentNutritionType = async (collectionName, nutritionCode) => {
    let db = await conectDB()
    let collection = db.collection(collectionName)
    return await collection.find({ nutritionCode: nutritionCode })
}

const createDocumentNutritionType = async (collectionName, data) => {
    let db = await conectDB()
    let collection = db.collection(collectionName)
    return await collection.insertOne(data)
}

const updateDocumentNutritionType = async (collectionName, nutritionCode, data) => {

}

const deleteDocumentNutritionType = (params) => {

}

module.exports = {
    consultDocumentsNutritionTypes,
    consultOneDocumentNutritionType,
    createDocumentNutritionType
}