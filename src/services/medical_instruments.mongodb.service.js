
const {get} = require("express/lib/response");
const { MongoClient, ObjectId } = require("mongodb");

// Connection URI
const uri = process.env.URI_MONGODB;

// Create a new MongoClient
const client = new MongoClient(uri);

/**
 * Conect a ew MongoCliente
 * @returns 
 */
const conectarDB = async () => {
  // Connect the client to the server
  await client.connect();
  let DB = client.db(process.env.DB_MONGODB)
  return DB;
}

/**
 * Consulta los instrumentos medicos
 * @param {*} nameCollection 
 * @param {*} filter 
 * @returns 
 */
const getMedInstruments = async (nameCollection, filter) => {
  let db = await conectarDB()
  let collectionDB = db.collection(nameCollection)
  filter = filter ? filter : {}
  getFilterId(filter, null, true) // Lo invoco para cuando sea la consulta para un instrumento medico en especifico
  return collectionDB.find(filter).toArray()
}

const getMedInstrument = async (nameCollection, filter) => {
  let db = await conectarDB()
  let collectionDB = db.collection(nameCollection)
  getFilterId(filter);
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
      throw new Error("Property _id is required")
    }
  }
}

const createMedInstrument = async (nameCollection, data) => {
  let db = await conectarDB()
  let collectionDB = db.collection(nameCollection)
  return await collectionDB.insertOne(data)
}

const deleteMedInstrument = async (nameCollection, filter) => {
  getFilterId(filter)
  let db = await conectarDB()
  let collectionDB = db.collection(nameCollection)
  return await collectionDB.deleteOne(filter)
}

const updateMedInstrument= async (nameCollection, filter, data) => {
  getFilterId(filter, data)
  let db = await conectarDB()
  let collectionDB = db.collection(nameCollection)
  return await collectionDB.replaceOne(filter, data)
}

module.exports = { getMedInstruments, getMedInstrument, createMedInstrument, deleteMedInstrument, updateMedInstrument }