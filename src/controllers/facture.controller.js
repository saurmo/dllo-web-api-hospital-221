const {getFactures} = require('../services/facture.mongodb.service');

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

const createBill = async (req, res) => {
    let response = {}
    try {
        response.ok = true;
        response.message = "Bill created correctly";
        let information = req.body;
        let result = await createFacture('facturacion',information);
        console.log(result);
        response.info = result;
        res.send(response);

    } catch (error) {
        response.ok = false;
        response.message = "Ha ocurrido un error agregando el usuario";
        response.info = error;
        res.status(500).send(response);
    }
}

module.exports = {
    getBills,
    createBill
}