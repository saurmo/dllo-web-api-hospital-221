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
    let result = await collection.find({ nutritionCode: nutritionCode }).toArray()
    if(result.length === 0){
        throw new Error("The nutrition type does not exist")
    }
    return result
}

const createDocumentNutritionType = async (collectionName, data) => {
    let db = await conectDB()
    let collection = db.collection(collectionName)
    let nutritionCode = data.nutritionCode
    let name = data.name
    if(nutritionCode.length === 0 || name.length === 0){
        throw new Error("nutrition code and name are required for the nutrition type to be saved.")
    }
    return await collection.insertOne(data)
}



const updateDocumentNutritionType = async (collectionName, nutritionCode, data) => {
    if((await consultOneDocumentNutritionType(collectionName, nutritionCode)).length === 0){
        throw new Error("The nutrition type to be updated does not exist")
    }
    let db = await conectDB()
    let collection = db.collection(collectionName)
    let filter = {nutritionCode: nutritionCode}
    let document = {$set: data}
    return collection.findOneAndUpdate(filter, document)
}

const deleteDocumentNutritionType = (collectionName, nutritionCode) => {

}

module.exports = {
    consultDocumentsNutritionTypes,
    consultOneDocumentNutritionType,
    createDocumentNutritionType,
    updateDocumentNutritionType
}