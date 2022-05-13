const {response} = require('express');
const { getMedInstruments, getMedInstrument, createMedInstrument, deleteMedInstrument, updateMedInstrument } = require('../services/medical_instruments.mongodb.service');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const consultMedicalInstruments = async (req, res) => {
    let response = {}
    try {
        response.ok = true;
        response.message = "Medical instruments consulted successfully.";
        //Consultando a la base de datos el instrumento
        let result = await getMedInstruments ('instrumentosMedicos');    
        console.log(result);
        response.info = result;
        res.send(response);
    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred consulting a medical instruments";
        response.info = error;
        res.status(500).send(response);
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const consultMedicalInstrument = async (req, res) => {
    let response = {}
    try {
        let _id = req.params["id"];
        response.ok = true;
        response.message = "Medical instrument consulted correctly";
        const result = await getMedInstrument ('instrumentosMedicos', {_id});               
        console.log(result);
        response.info = result;
        res.send(response);
    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred consulting a medical instrument";
        console.log(error)
        response.info = error;
        res.status(500).send(response);
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const createMedicalInstrument = async (req, res) => {
    let response = {}
    try {
        response.ok = true;
        response.message = "Medical instrument add correctly";
        let information = req.body;
        let result = await createMedInstrument('instrumentosMedicos',information);
        console.log(result);
        response.info = result;
        response.data = information;
        res.send(response);
    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred adding a medical instrument";
        response.info = error;
        console.log(error)
        res.status(500).send(response);
    }
}

const updateMedicalInstrument = async (req, res) => {
    let response = {}
    //const { instrumentName, quantity, price } = req.body;
    try {
        let _id = req.params["id"];
        response.ok = true;
        response.message = "Medical instrument updated correctly";
        let information = req.body;
        let result = await updateMedInstrument ('instrumentosMedicos',{_id}, information);
        console.log(result);
        response.info = result;
        response.data = information;
        res.send(response);
    } catch (error) {
        response.ok = false;
        response.message = "An error occurred while updating a medical instrument";
        console.log(error)
        response.info = error;
        res.status(500).send(response);
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteMedicalInstrument = async (req, res) => {
    let response = {}
    try {
        let _id = req.params["id"];
        response.ok = true;
        response.message = "Medical instrument delete correctly";
        let information = req.body;
        let result = await deleteMedInstrument ('instrumentosMedicos',{_id}, information)          
        console.log(result);
        response.info = result;
        response.data = information;
        res.send(response);
    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred removing a medical instrument";
        console.log(error);
        response.info = error;
        res.status(500).send(response); 
    }
}


module.exports = {
    consultMedicalInstruments, 
    createMedicalInstrument, 
    consultMedicalInstrument, 
    deleteMedicalInstrument, 
    updateMedicalInstrument
}

