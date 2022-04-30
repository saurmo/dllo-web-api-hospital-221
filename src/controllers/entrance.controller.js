const { leerDocumentos, agregarDocumento, modificarDocumento,
    eliminarDocumento } = require('../services/mongodb.service');

/**
* 
* @param {Request} req 
* @param {Response} res 
*/

const createLogin = async (req, res) => {
    const response = await "aqui van todos los empleados"
    console.log('Lista todos los empleados');
    res.status(200).json(response)
  };

/**
* 
* @param {Request} req 
* @param {Response} res 
*/

const getLogin = async (req, res) => {
    const response = await "aqui van todos los empleados"
    console.log('Lista todos los empleados');
    res.status(200).json(response)
  };

/**
* 
* @param {Request} req 
* @param {Response} res 
*/

const deleteLogin = async (req, res) => {
    const response = await "aqui van todos los empleados"
    console.log('Lista todos los empleados');
    res.status(200).json(response)
  };

/**
* 
* @param {Request} req 
* @param {Response} res 
*/

const getLogins = async (req, res) => {
    const response = await "aqui van todos los empleados"
    console.log('Lista todos los empleados');
    res.status(200).json(response)
  };

/**
* 
* @param {Request} req 
* @param {Response} res 
*/

const  updateLogin = async (req, res) => {
    const response = await "aqui van todos los empleados"
    console.log('Lista todos los empleados');
    res.status(200).json(response)
  };

  module.exports = { createLogin, getLogin, deleteLogin, getLogins, updateLogin }
