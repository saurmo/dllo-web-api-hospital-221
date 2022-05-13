const { MongoClient } = require("mongodb");

const uri = process.env.URIMONGODB 

const client = new MongoClient(uri);

const connectDB = async  ()=>{
//connect the client to the server
await client.connect();
let DB = client.db(process.env.DB_MONGODB)
return DB;
}

/**
 * @param {string} colletionName 
 * @param {json} information 
 * @returns {json} Resultado de la inserción 
 */
const createRoom = async (collection,information) => { 
    let db = await connectDB()
    let collectionone = db.collection(collection)
    return await collectionone.insertOne(information)
}

/**
 * 
 * @param {string} colletionName 
 * @returns {json} Información de las carreras
 */
const getRoom = async (colletionName) => {
    let db = await connectDB()
    let coleccion = db.collection(colletionName)
    let resultado = coleccion.find({}).toArray()
    return resultado
}

/**
 * 
 * @param {*} collection 
 * @param {*} code 
 * @param {*} information 
 * @returns 
 */
const updateRoom = async (collection, code, information) => {
    let db = await connectDB()
    let collectionone = db.collection(collection)
    let filter = {"roomCode": code}
    let data = {$set: information}
    return collectionone.findOneAndUpdate(filter, data)
}


/**
 * 
 * @param {json} filtro 
 * @returns Resultado de desactivar la carrera
 */
 const deleteRoom = async(collection,code) => { 
    let db = await connectDB()
    let collection_ =db.collection(collection)
    let filter = {"roomCode": code}
    await collection_.findOneAndDelete(filter)
    let resultado = "Room removed"
    return resultado
}


/**
 * 
 * @param {json} information 
 * 
 */
const validarInfoCarrera = (information) => { 
  let codigo = information["codigo"]
  let nombre = information["nombre"]
  let descripcion = information["descripcion"]

  if (!(codigo.length >= 2 &&  codigo.length <= 10))  {    
    throw new Error ("El código es obligatorio con mínimo 2 caracteres y máximo 10 caracteres")
  }
  if (!(nombre.length >= 5 &&  nombre.length <= 150))  {
    throw new Error ("El nombre es obligatorio con mínimo 5 caracteres y máximo 150 caracteres")
  }
  if (!(descripcion.length >=0 && descripcion.length <= 500 ))  {
    throw new Error ("La descripción de la carrera opcional, máximo 500 caracteres")
  }
}

/**
 * 
 * @param {string} coderoom 
 * @returns {boolean} Si la carrera existe y está activa
 */


/**
 * 
 * @param {string} documentoIdentidad 
 * @returns {boolean} Si el estudiante existe 
 */
const existeEstudiante = async(documentoIdentidad) => {
    let db = await connectDB()
    let coleccion = db.collection(process.env.COLECCION_ESTUDIANTES)
    let estudiantes = coleccion.find().project({ _id: 0, nro_identificacion: 1 })
    let encontrado = false
    await estudiantes.forEach((estudiante) => {
        if(estudiante.nro_identificacion === documentoIdentidad){
            encontrado = true
        }
    })
    return encontrado
}

const validarNumeroIdentificacion = (jsonEstudiante) => {
    if (!(jsonEstudiante["nro_identificacion"].length >= 8 && jsonEstudiante["nro_identificacion"].length <= 15)) {
        throw new Error("El numero de identificacion debe tener minimo 8 y maximo 15 caracteres")
    }
}

module.exports= {
    createRoom,
    getRoom,
    updateRoom,
    deleteRoom } 
