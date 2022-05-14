const { ReadDocAppointments, ReadsDocAppointments, CreateDocAppointments, UpdateDocAppointments, DeleteDocAppointments } = require("../services/appointment.service")

const ReadAppointments = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "appointment type reading successfully"
        let _id = req.params.id
        let result = await ReadDocAppointments(process.env.COLLECTION_APPOINTMENTS_MONGODB,
            { _id })
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

const ReadsAppointments = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "appointment type reading successfully"
        let result = await ReadsDocAppointments(process.env.COLLECTION_APPOINTMENTS_MONGODB)
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

const CreateAppointments = async (req, res) => {
    let response = {}
    try {
        let information = req.body
        if((Object.keys(information).length !== 0)){
            response.ok = true
            response.message = "appointment type creating successfully"
            await CreateDocAppointments(process.env.COLLECTION_APPOINTMENTS_MONGODB,
                information)
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

const UpdateAppointments = async (req, res) => {
    let response = {}
    try {
        let information = req.body
        if((Object.keys(information).length !== 0)){
            response.ok = true
            response.message = "appointment type updating successfully"
            let _id = req.params.id
            let result = await UpdateDocAppointments(process.env.COLLECTION_APPOINTMENTS_MONGODB,
                { _id }, information)
            response.info = result;
            response.data = information;
            res.send(response);
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

const DeleteAppointments = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "appointment type deleted successfully"
        let _id = req.params.id
        let result = await DeleteDocAppointments(process.env.COLLECTION_APPOINTMENTS_MONGODB, {_id})
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

module.exports = {
    CreateAppointments,
    ReadAppointments,
    ReadsAppointments,
    UpdateAppointments,
    DeleteAppointments
}