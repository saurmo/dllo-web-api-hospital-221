
const { MongoClient, ObjectId } = require("mongodb");

// Connection URI
const uri = process.env.URI_MONGODB;

// Create a new MongoClient
const client = new MongoClient(uri);

const conectarDB = async () => {
  // Connect the client to the server
  await client.connect();
  let DB = client.db(process.env.DB_MONGODB)
  return DB;
}

/**
 * 
 * @param {*} nameCollection 
 * @param {*} filter 
 * @returns 
 */
const getDocuments = async (nameCollection, filter) => {
  let db = await conectarDB()
  let collectionDB = db.collection(nameCollection)
  filter = filter ? filter : {}
  getFilterId(filter, null, true) // Lo invoco para cuando sea la consulta para un usuario en especifico
  return collectionDB.find(filter).toArray()
}

const getDocument = async (nameCollection, filter) => {
  let db = await conectarDB()
  let collectionDB = db.collection(nameCollection)
  return collectionDB.findOne(filter)
}

/**
 * Convirtirtiendo el filter._id en un objetoId
 * @param {*} filter 
 * @param {*} newDocument 
 * @param {*} isConsultation Me indica si el metodo se 
 * invoca desde leerDocumentos
 */
const getFilterId = (filter, newDocument, isConsultation = false) => {

  if (isConsultation) {
    // Cuando viene de leerDocumentos
    if (filter && filter._id) {
      filter._id = new ObjectId(filter._id)
    } 
  }else {
    // Cuando viene de modificar o eliminar documento
    if (filter && filter._id) {
      filter._id = new ObjectId(filter._id)
      if (newDocument) { // Validacion (newDocument != null && newDocument!=undefined && newDocument!=false)
        newDocument._id = filter._id
      }
    } else {
      throw new Error("El id es obligatorio")
    }
  }

}

const createDocument = async (nameCollection, informacion) => {
  let db = await conectarDB()
  let collectionDB = db.collection(nameCollection)
  return await collectionDB.insertOne(informacion)
}

const deleteDocument = async (nameCollection, filtro) => {
  getFilterId(filtro)
  let db = await conectarDB()
  let collectionDB = db.collection(nameCollection)
  return await collectionDB.deleteOne(filtro)
}

const updateDocument = async (nameCollection, filtro, newDocument) => {
  getFilterId(filtro, newDocument)
  let db = await conectarDB()
  let collectionDB = db.collection(nameCollection)
  return await collectionDB.replaceOne(filtro, newDocument)
}

module.exports = { createDocument, updateDocument, deleteDocument, getDocuments, getDocument }