
const { createHash } = require('../services/bcrypt.service');
const _service = require('../services/mongodb.generic.service');


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const createDocument = async (req, res) => {
    let collection = req.params.collection
    let response = {}
    try {
        response.ok = true
        response.message = collection + ": Creación exitosa."
        let informacion = req.body
        if (collection === 'users') {
            informacion.password = createHash(informacion.password)
        }
        let resultado = await _service.createDocument(collection, informacion)

        response.info = resultado
        res.send(response)
    } catch (error) {
        console.log(error);

        response.ok = false
        response.message = "Ha ocurrido un error insertando. " + collection
        response.info = error
        res.status(500).send(response)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const updateDocument = async (req, res) => {
    let collection = req.params.collection

    let response = {}
    try {
        let _id = req.params["id"]
        response.ok = true
        response.message = collection + ": Modificación exitosa."
        let informacion = req.body
        let resultado = await _service.updateDocument(collection, { _id }, informacion)
        response.info = resultado
        res.send(response)
    } catch (error) {
        console.log(error);
        response.ok = false
        response.message = "Ha ocurrido un error modificando el usuario."
        response.info = error
        res.status(500).send(response)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteDocument = async (req, res) => {
    let collection = req.params.collection

    let response = {}
    try {
        let _id = req.params["id"]
        response.ok = true
        response.message = collection + ":Eliminación correcta."
        let resultado = await _service.deleteDocument(collection, { _id })
        response.info = resultado
        res.send(response)
    } catch (error) {
        console.log(error);
        response.ok = false
        response.message = "Ha ocurrido un error eliminando el usuario."
        response.info = error
        res.status(500).send(response)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const getDocument = async (req, res) => {
    let collection = req.params.collection

    let response = {}
    try {
        let _id = req.params["id"]
        response.ok = true
        response.message = collection + ": Consulta ejecutada."
        // COnsultar usuario en la base de datos
        let resultado = await _service.getDocument(collection, { _id })
        console.log(resultado);
        response.info = resultado
        res.send(response)
    } catch (error) {
        console.log(error);
        response.ok = false
        response.message = "Ha ocurrido un error eliminando el usuario."
        response.info = error
        res.status(500).send(response)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const getDocuments = async (req, res) => {
    let collection = req.params.collection

    let response = {}
    try {
        response.ok = true
        response.message = collection + ": Consulta ejecutada."
        // Consulta a la base de datos de usuarios
        let resultado = await _service.getDocuments(collection)
        response.info = resultado
        res.send(response)

    } catch (error) {
        console.log(error);
        response.ok = false
        response.message = "Ha ocurrido un error consultando los usuarios."
        response.info = error
        res.status(500).send(response)
    }
}

module.exports = {
    createDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    getDocuments
}