const { response } = require('express');
const { createMedicament, updateMedicament, deleteMedicament, getMedicaments, getMedicament } = require('../services/medicaments.mongodb.service');

const getMedicamentsControllers = async (req, res) => {
    let response = {}
    try {
        response.ok = true;
        response.message = "Medicaments consulted correctly";
        // Consulta a la base de datos de usuarios
        let result = await getMedicaments('medicamentos');
        console.log(result);
        response.info = result;
        res.send(response);
    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred consulting the Medicaments";
        response.info = error;
        res.status(500).send(response);
    }
}

const getMedicamentController = async (req, res) => {
    let response = {}
    try {
        let _id = req.params["id"];
        response.ok = true;
        response.message = "Medicament consulted correctly";
        let result = await getMedicament('medicamentos', { _id });
        console.log(result);
        response.info = result;
        res.send(response);

    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred consulting the medicament";
        console.log(error);
        response.info = error;
        res.status(500).send(response);
    }
}

const createMedicamentController = async (req, res) => {
    let response = {}
    try {
        response.ok = true;
        response.message = "Medicament created correctly";
        let information = req.body;
        let result = await createMedicament('medicamentos', information);
        console.log(result);
        response.info = result;
        response.data = information;
        res.send(response);

    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred creating the Medicaments";
        response.info = error;
        res.status(500).send(response);
    }
}

const updateMedicamentController = async (req, res) => {
    let response = {}
    try {
        let _id = req.params["id"];
        response.ok = true;
        response.message = "Medicament updated successfully";
        let information = req.body;
        let result = await updateMedicament('medicamentos', { _id }, information);
        console.log(result);
        response.info = result;
        response.data = information;
        res.send(response);

    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred updating the medicaments";
        console.log(error);
        response.info = error;
        res.status(500).send(response);
    }
}

const deleteMedicamentController = async (req, res) => {
    let response = {}
    try {
        let _id = req.params["id"];
        response.ok = true;
        response.message = "Medicament deleted successfully";
        let information = req.body;
        let result = await deleteMedi('medicamentos', {_id}, information);
        console.log(result);
        response.info = result;
        response.data = information;
        res.send(response);

    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred deleting the medicaments";
        console.log(error);
        response.info = error;
        res.status(500).send(response);
    }
}

module.exports = {
    getMedicamentsControllers,
    getMedicamentController,
    createMedicamentController,
    updateMedicamentController,
    deleteMedicament
}