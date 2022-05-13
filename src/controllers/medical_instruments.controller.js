const Medical_Instruments = require('../services/medical_instruments.service')
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
        const result = await Medical_Instruments ('instrumentosMedicos');    
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
const createMedicalInstrument = async (req, res) => {
    let response = {}
    try {
        response.ok = true;
        response.message = "Medical instrument add correctly";
        let information = req.body;
        let result = await addMedicalInstrument('instrumentosMedicos',information);
        console.log(result);
        response.info = result;
        response.data = information;
        res.send(response);
    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred adding a medical instrument";
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
        response.ok = true;
        response.message = "Medical instrument consulted correctly";
        const result = await Medical_Instruments ('instrumentosMedicos',information)               
        console.log(result);
        response.info = result;
        res.send(response);
    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred consulting a medical instrument";
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
        response.ok = true;
        response.message = "Medical instrument delete correctly";
        const result = await Medical_Instruments ('instrumentosMedicos',{_id}, information)            //.findByIdAndUpdate(req.params.id, { activo: false });
        console.log(result);
        response.info = result;
        res.send(response);
    } catch (error) {
        response.ok = false;
        response.message = "An error has occurred removing a medical instrument";
        response.info = error;
        res.status(500).send(response);
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const updateMedicalInstrument = async (req, res) => {
    let response = {}
    const { instrumentName, quantity, price } = req.body;
    try {
        console.log(req.params.id);
        response.ok = true;
        response.message = "Medical instrument updated correctly";
        let result = await Medical_Instruments ('instrumentosMedicos',{_id}, information)
        console.log(result);
        response.info = result;
        res.send(response);
    } catch (error) {
        response.ok = false;
        response.message = "An error occurred while updating a medical instrument";
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

