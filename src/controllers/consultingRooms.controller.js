// Importar los servicio
const { leerDocumentos, agregarDocumento, modificarDocumento,
    eliminarDocumento } = require('../services/mongodb.service');


// create consulting room

/**
* 
* @param {Request} req 
* @param {Response} res 
*/
const createConsultingRoom = async (req, res) => {
    const response = await "here we create consulting rooms"
    res.status(200).json(response)
  };

/**
* 
* @param {Request} req 
* @param {Response} res 
*/
const getConsultingRooms = async (req, res) => {
    const response = await "here we consulting"
    res.status(200).json(response)
  };

/**
* 
* @param {Request} req 
* @param {Response} res 
*/
const getConsultingRoom = async (req, res) => {
    const response = await "here we consulting"
    res.status(200).json(response)
  };

/**
* 
* @param {Request} req 
* @param {Response} res 
*/
const deleteConsultingRoom = async (req, res) => {
    const response = await "here we consulting"
    res.status(200).json(response)
  };
/**
* 
* @param {Request} req 
* @param {Response} res 
*/
const updateConsultingRoom = async (req, res) => {
    const response = await "here we consulting"
    res.status(200).json(response)
  };

module.exports = {
  
   getConsultingRoom,getConsultingRooms,deleteConsultingRoom,updateConsultingRoom,createConsultingRoom
}