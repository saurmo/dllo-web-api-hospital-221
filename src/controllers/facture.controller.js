const { response } = require('express');
const {getFactures, createFacture, updateFacture, getFacture} = require('../services/facture.mongodb.service');

const getBills = async (req,res) =>{
    let response = {}
    try {
        response.ok = true;
        response.message = "Bills consulted correctly";
        // Consulta a la base de datos de usuarios
        let result = await getFactures('facturacion');
        console.log(result);
        response.info = result;
        res.send(response);
    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred consulting the bills";
        response.info = error;
        res.status(500).send(response);
    }
}

const getBill = async (req, res) => {
    let response = {}
    try {
        let _id = req.params["id"];
        response.ok = true;
        response.message = "Bill consulted correctly";
        let result = await getFacture('facturacion', {_id});
        console.log(result);
        response.info = result;
        res.send(response);

    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred consulting the bill";
        console.log(error);
        response.info = error;
        res.status(500).send(response);
    }
}

const createBill = async (req, res) => {
    let response = {}
    try {
        response.ok = true;
        response.message = "Bill created correctly";
        let information = req.body;
        let result = await createFacture('facturacion',information);
        console.log(result);
        response.info = result;
        response.data = information;
        res.send(response);

    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred creating the bills";
        response.info = error;
        res.status(500).send(response);
    }
}

const updateBill = async (req, res) => {
    let response = {}
    try {
        let _id = req.params["id"];
        response.ok = true;
        response.message = "Facture updated successfully";
        let information = req.body;
        let result = await updateFacture('facturacion', {_id}, information);
        console.log(result);
        response.info = result;
        response.data = information;
        res.send(response);

    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred updating the bills";
        console.log(error);
        response.info = error;
        res.status(500).send(response);
    }
}

module.exports = {
    getBills,
    getBill,
    createBill,
    updateBill
}