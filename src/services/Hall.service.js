const { MongoClient, ObjectId } = require('mongodb')

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
 * Create a halls
 * @param {*} collectionName 
 * @param {*} information {idHall, Piso, Halltype, block}
 * @returns 
 */
 const createDocumentHall = async (collectionName, information) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    return await collection.insertOne(information)
}


/**
 * Read all the halls
 * @param {*} collectionName 
 * @returns 
 */
 const readDocumentHalls = async (collectionName) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    return await collection.find().toArray()
}

/**
 * Read one hall
 * @param {*} collectionName 
 * @param {*} id 
 * @returns 
 */
 const readDocumentHall = async (collectionName,filter) => {
     getFilter(filter)
    let db = await connectDB()
    let collection = db.collection(collectionName)
    return await collection.findOne(filter)
}

/**
 * Method for get the id
 * @param {*} filter 
 * @param {*} newDocument 
 */
const getFilter = (filter, newDocument, isConsult=false) => {
    if (isConsult) {
        // When come from read
        if (filter && filter._id) {
          filter._id = new ObjectId(filter._id)
        } 
      }else {
        // When come from update and delete
        if (filter && filter._id) {
          filter._id = new ObjectId(filter._id)
          if (newDocument) { newDocument._id = filter._id
          }
        } else {
          throw new Error("Id is required")
        }
      }
}

/**
 * Method for update the halls
 * @param {*} collectionName 
 * @param {*} filter 
 * @param {*} newDocument 
 * @returns 
 */
const updateDocumentHalls = async (collectionName, filter, newDocument) => {
    getFilter(filter, newDocument)
    let db = await connectDB()
    let collection = db.collection(collectionName)
    let hall = await readDocumentHall(collectionName, filter)
    if (!consultingRoom) {
        throw new Error("Error with the consulting hall")
    }
    return await collection.replaceOne(filter, newDocument)
  }

  /**
   * Delete a consulting hall
   * @param {*} collectionName 
   * @param {*} filter 
   * @returns 
   */
  const deleteDocumentHalls= async (collectionName, filter) => {
    getFilter(filter)
    let db = await connectDB()
    let collection = db.collection(collectionName)
    
    return await collection.deleteOne(filter)
}


module.exports = {createDocumentHall,readDocumentHall,readDocumentHalls,updateDocumentHalls,deleteDocumentHalls}