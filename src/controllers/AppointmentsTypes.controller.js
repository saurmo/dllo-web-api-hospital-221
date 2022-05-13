const {ReadDocAppointmentsTypes,
     ReadsDocAppointmentsTypes,
     CreateDocAppointmentsTypes,
     UpdateDocAppointmentsTypes,
     DeleteDocAppointmentsTypes
    } = require("../services/AppointmentsTypes.service")

const ReadAppointmentsTypes = async (req, res) => {
    const readNutritionRegistry = async (req, res) => {
        let response = {}
        try {
            response.ok = true
            response.message = "appointment type reading successfully"
            let idAppointmentType = req.params.id
            let result = await ReadDocAppointmentsTypes(process.env.COLLECTION_APPOINTMENT_TYPE_MONGODB,
                {idAppointmentType})
            response.info = result
            res.send(response)
        } catch (error) {
            console.log(error)
            response.ok = false
            response.message = "An error occurred reading the appointment type"
            response.info = error.message
            res.status(500).send(response)
        }
    
    }
}

const ReadsAppointmentsTypes = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "appointment type reading successfully"
        let result = await ReadsDocAppointmentsTypes(process.env.COLLECTION_APPOINTMENT_TYPE_MONGODB)
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred reading the appointment type"
        response.info = error.message
        res.status(500).send(response)
    }
}

const CreateAppointmentsTypes = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "appointment type creating successfully"
        let information = req.body
        await CreateDocAppointmentsTypes(process.env.COLLECTION_APPOINTMENT_TYPE_MONGODB, 
            information)
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred creating the appointment type"
        response.info = error.message
        res.status(500).send(response)
    }
}

const UpdateAppointmentsTypes = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "appointment type updating successfully"
        let idAppointmentType = req.params.id
        let information = req.body
        let result = await UpdateDocAppointmentsTypes(process.env.COLLECTION_APPOINTMENT_TYPE_MONGODB,
            {idAppointmentType}, information)
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred updating the appointment type"
        response.info = error.message
        res.status(500).send(response)
    }
}

const DeleteAppointmentsTypes = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "appointment type deleted successfully"
        let idAppointmentType = req.params.id
        let result = await DeleteDocAppointmentsTypes(process.env.COLLECTION_APPOINTMENT_TYPE_MONGODB,{idAppointmentType})
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred deleting the appointment type"
        response.info = error.message
        res.status(500).send(response)
    }
}

module.exports = {CreateAppointmentsTypes, 
    ReadAppointmentsTypes, 
    ReadsAppointmentsTypes,
    UpdateAppointmentsTypes, 
    DeleteAppointmentsTypes}