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
 * Search hall in DB and return true o false
 * @param {*} information {idConsultingRooms, hall, availability}
 * @returns {*} True if exist
 */
 const hallExist = async (information) => {
    let db = await connectDB()
    let collection = db.collection("hall")
    let hall = await collection.find({hall:information}).toArray()
    if (hall.length == 0) {
        return false
    }
}
/**
 * Create a consulting rooms
 * @param {*} collectionName 
 * @param {*} information {idConsultingRooms, hall, availability}
 * @returns 
 */
 const createDocumentConsultingRooms = async (collectionName, information) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    if (!(await hallExist(information.hall))) {
        throw new Error("Error with the hall ")
    }
    return await collection.insertOne(information)
}


/**
 * Read all the consulting rooms
 * @param {*} collectionName 
 * @returns 
 */
 const readDocumentsConsultingRooms = async (collectionName) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    return await collection.find().toArray()
}

/**
 * Read one consulting rooms by id
 * @param {*} collectionName 
 * @param {*} id 
 * @returns 
 */
 const readDocumentConsultingRoom = async (collectionName,id) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    return collection.findOne(id)
}

/**
 * 
 * @param {*} filter 
 * @param {*} newDocument 
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

/**
 * 
 * @param {*} collectionName 
 * @param {*} filter 
 * @param {*} newDocument 
 * @returns 
 */
const updateDocumentConsultingRooms = async (collectionName, filter, newDocument) => {
    getFilter(filter, newDocument)
    let db = await connectDB()
    let collection = db.collection(collectionName)
    let consultingRoom = await readDocumentConsultingRoom(filter)
    if (!consultingRoom) {
        throw new Error("Error with the consulting rooms")
    }
    return await collection.replaceOne(filter, newDocument)
  }

  /**
   * Delete a consulting room
   * @param {*} collectionName 
   * @param {*} filter 
   * @returns 
   */
  const deleteDocumentConsultingRooms= async (collectionName, filter) => {
    let db = await connectDB()
    let collection = db.collection(collectionName)
    getFilter(filter)
    return await collection.deleteOne(filter)
}


module.exports = {createDocumentConsultingRooms,readDocumentConsultingRoom,readDocumentsConsultingRooms,updateDocumentConsultingRooms,deleteDocumentConsultingRooms}