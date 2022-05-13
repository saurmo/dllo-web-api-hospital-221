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
const createRoom = async (collectionName,information) => { 
    let db = await connectDB()
    let collection = db.collection(collectionName)
    return await collection.insertOne(information)
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
 * @param {string} colletionName 
 * @param {string} filtro 
 * @param {json} nuevoDocumento 
 * @returns {json} Resultado de la modificación
 */
const updateRoom = async(colletionName,filtro,nuevoDocumento) => { 
    validarInfoCarrera(nuevoDocumento)

    let carrera = await leerDocumentoCarreraConEstudiantes({codigo:filtro})

    if(carrera[0].estudiantes.length != 0){
        throw new Error("No puede modificar la carrera ya que tiene estudiantes matriculados")
    }

    let db = await connectDB()
    let coleccion =db.collection(colletionName)
    let query = { codigo: filtro }
    let documento = {$set:nuevoDocumento}
    return await coleccion.findOneAndUpdate( query, documento)

}


/**
 * 
 * @param {json} filtro 
 * @returns Resultado de desactivar la carrera
 */
 const deleteRoom = async(filtro) => { 
    let db = await connectDB()
    if(!(await roomExists(filtro.codigo))){
        throw new Error("La carrera no existe o ya está deshabilitada")
    }
    let documentoActualizado = {$set: {activo: false,},}
    let coleccion =db.collection(process.env.COLECCION_CARRERAS)
    return await coleccion.findOneAndUpdate({codigo:filtro.codigo}, documentoActualizado)
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
