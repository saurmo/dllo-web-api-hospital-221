
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

const leerDocumentos = async (nombreColeccion, filtro) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  filtro = filtro ? filtro : {}
  obtenerFiltroId(filtro, null, true) // Lo invoco para cuando sea la consulta para un usuario en especifico
  return coleccion.find(filtro).toArray()
}

const leerDocumento = async (nombreColeccion, filtro) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  return coleccion.findOne(filtro)
}

/**
 * Convirtirtiendo el filtro._id en un objetoId
 * @param {*} filtro 
 * @param {*} nuevoDocumento 
 * @param {*} esConsulta Me indica si el metodo se 
 * invoca desde leerDocumentos
 */
const obtenerFiltroId = (filtro, nuevoDocumento, esConsulta = false) => {

  if (esConsulta) {
    // Cuando viene de leerDocumentos
    if (filtro && filtro._id) {
      filtro._id = new ObjectId(filtro._id)
    } 
  }else {
    // Cuando viene de modificar o eliminar documento
    if (filtro && filtro._id) {
      filtro._id = new ObjectId(filtro._id)
      if (nuevoDocumento) { // Validacion (nuevoDocumento != null && nuevoDocumento!=undefined && nuevoDocumento!=false)
        nuevoDocumento._id = filtro._id
      }
    } else {
      throw new Error("El id es obligatorio")
    }
  }

}

const agregarDocumento = async (nombreColeccion, informacion) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  return await coleccion.insertOne(informacion)
}

const eliminarDocumento = async (nombreColeccion, filtro) => {
  obtenerFiltroId(filtro)
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  return await coleccion.deleteOne(filtro)
}

const modificarDocumento = async (nombreColeccion, filtro, nuevoDocumento) => {
  obtenerFiltroId(filtro, nuevoDocumento)
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  return await coleccion.replaceOne(filtro, nuevoDocumento)
}

module.exports = { agregarDocumento, modificarDocumento, eliminarDocumento, leerDocumentos, leerDocumento }