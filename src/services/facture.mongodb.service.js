
const { MongoClient, ObjectId } = require("mongodb");

// Connection URI
const uri = process.env.URI_MONGODB;

// Create a new MongoClient
const client = new MongoClient(uri);

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
 * Consulta los documentos de una colección
 * @param {*} collection 
 * @param {*} filter 
 * @returns 
 */
const getFactures = async (collection, filter) => {
  let db = await connectDB()
  let collectionDB = db.collection(collection)
  filter = filter ? filter : {}
  getFilter(filter, null, true) // Lo invoco para cuando sea la consulta para un usuario en especifico
  return collectionDB.find(filter).toArray()
}

const getFacture = async (collection, filter) => {
  let db = await connectDB()
  let collectionDB = db.collection(collection)
  return collectionDB.findOne(filter)
}

/**
 * Convirtirtiendo el filtro._id en un objetoId
 * @param {*} filtro 
 * @param {*} nuevoDocumento 
 * @param {*} isHttpMethodGet Me indica si el metodo se 
 * invoca desde leerDocumentos
 */
const getFilter = (filter, newDocument, isHttpMethodGet = false) => {

  if (isHttpMethodGet) {
    // Cuando viene de leerDocumentos
    if (filter && filter._id) {
      filter._id = new ObjectId(filter._id)
    }
  } else {
    // Cuando viene de modificar o eliminar documento
    if (filter && filter._id) {
      filter._id = new ObjectId(filter._id)
      if (newDocument) {
        newDocument._id = filter._id
      }
    } else {
      throw new Error("Property _id is required.")
    }
  }

}

const createFacture = async (collection, data) => {
  let db = await connectDB()
  let collectionDB = db.collection(collection)
  return await collectionDB.insertOne(data)
}

const deleteDocument = async (collection, filter) => {
  getFilter(filter)
  let db = await connectDB()
  let collectionDB = db.collection(collection)
  return await collectionDB.deleteOne(filter)
}

const updateDocument = async (collection, filter, data) => {
  getFilter(filter, data)
  let db = await connectDB()
  let collectionDB = db.collection(collection)
  return await collectionDB.replaceOne(filter, data)
}

module.exports = { createFacture, updateDocument, deleteDocument, getFactures, getFacture }