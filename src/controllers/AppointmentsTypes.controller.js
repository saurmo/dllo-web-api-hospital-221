const {ReadDocAppointmentsTypes,
     ReadsDocAppointmentsTypes,
     CreateDocAppointmentsTypes,
     UpdateDocAppointmentsTypes,
     DeleteDocAppointmentsTypes
    } = require("../services/AppointmentsTypes.service")

const ReadAppointmentsTypes = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "appointment type reading successfully"
        let _id = req.params.id
        let result = await ReadDocAppointmentsTypes(process.env.COLLECTION_APPOINTMENT_TYPE_MONGODB,
            {_id})
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
        let information = req.body
        if((Object.keys(information).length !== 0)){
            response.ok = true
            response.message = "appointment type creating successfully"
            await CreateDocAppointmentsTypes(process.env.COLLECTION_APPOINTMENT_TYPE_MONGODB, information)
            res.send(response)
        } else {
            response.ok = false
            response.message = "Empty Body"
            response.info = null
            res.status(500).send(response)
        }
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
        if((Object.keys(information).length !== 0)){
            response.ok = true
            response.message = "appointment type updating successfully"
            let _id = req.params.id
            let information = req.body
            let result = await UpdateDocAppointmentsTypes(process.env.COLLECTION_APPOINTMENT_TYPE_MONGODB,
                {_id}, information)
            response.info = result
            res.send(response)
        } else {
            response.ok = false
            response.message = "Empty Body"
            response.info = null
            res.status(500).send(response)
        }
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
        let _id = req.params.id
        let result = await DeleteDocAppointmentsTypes(process.env.COLLECTION_APPOINTMENT_TYPE_MONGODB,{_id})
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