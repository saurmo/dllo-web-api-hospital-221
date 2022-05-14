const { MongoClient, ObjectId } = require('mongodb')

// Connection URI
const uri = process.env.URI_MONGODB

// Create a new MongoClient
const client = new MongoClient(uri)

/**
 * @returns 
 */
const connectDB = async () => {
    await client.connect();
    let DB = client.db(process.env.DB_MONGODB)
    return DB;
}

/**
 * @param {*} collectionName 
 * @param {*} information
 * @returns x
 */
const createDocumentClinicHistory = async (collectionName, information) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    return await collection.insertOne(information)
}

/**
 * @param {*} collectionName 
 * @returns 
 */
 const readDocumentsClinicHistorys = async (collectionName) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    return await collection.find().toArray()
}

/**
 * @param {*} collectionName 
 * @param {*} id 
 * @returns 
 */
const readDocumentClinicHistory = async (collectionName,filter) => {
    getFilter(filter)
   let db = await connectDB()
   let collection = db.collection(collectionName)
   return await collection.findOne(filter)
}

/**
 * @param {*} filter 
 * @param {*} newDocument 
 */
const getFilter = (filter, newDocument, isConsult=false) => {
    if (isConsult) {
        if (filter && filter._id) {
          filter._id = new ObjectId(filter._id)
        } 
      }else {
        if (filter && filter._id) {
          filter._id = new ObjectId(filter._id)
          if (newDocument) { 
            newDocument._id = filter._id
          }
        } else {
          throw new Error("El id es obligatorio")
        }
      }
}

/**
 * @param {*} collectionName 
 * @param {*} filter 
 * @param {*} newDocument 
 * @returns 
 */
const updateDocumentClinicHistory = async (collectionName, filter, newDocument) => {
    getFilter(filter, newDocument)
    let db = await connectDB()
    let collection = db.collection(collectionName)
    let consultingRoom = await readDocumentClinicHistory(collectionName, filter)
    if (!consultingRoom) {
        throw new Error("Error with the clinic history")
    }
    return await collection.replaceOne(filter, newDocument)
  }

  /**
   * @param {*} collectionName 
   * @param {*} filter 
   * @returns 
   */
const deleteDocumentClinicHistory= async (collectionName, filter) => {
    getFilter(filter)
    let db = await connectDB()
    let collection = db.collection(collectionName)
    
    return await collection.deleteOne(filter)
}


module.exports = {createDocumentClinicHistory,readDocumentClinicHistory,readDocumentsClinicHistorys,updateDocumentClinicHistory,deleteDocumentClinicHistory}