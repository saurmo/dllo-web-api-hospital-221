//call the controller at routers
const {ReadDocPatients,
    ReadsDocPatients,
    CreateDocPatients,
    UpdateDocPatients,
    DeleteDocPatients
   } = require("../services/Patients.service")

//  read  patients   
const ReadPatients = async (req, res) => {
   let response = {}
   try {
       response.ok = true
       response.message = "Patients reading successfully"
       let _id = req.params.id
       let result = await ReadDocPatients(process.env.COLLECTION_PATIENTS_MONGODB,
           {_id})
       response.info = result
       res.send(response)
   } catch (error) {
       console.log(error)
       response.ok = false
       response.message = "An error occurred reading the Patients"
       response.info = error.message
       res.status(500).send(response)
   } 
}
// read patients
const ReadsPatients = async (req, res) => {
   let response = {}
   try {
       response.ok = true
       response.message = "Patients reading successfully"
       let result = await ReadsDocPatients(process.env.COLLECTION_PATIENTS_MONGODB)
       response.info = result
       res.send(response)
   } catch (error) {
       console.log(error)
       response.ok = false
       response.message = "An error occurred reading the Patients"
       response.info = error.message
       res.status(500).send(response)
   }
}
// create patients
const CreatePatients = async (req, res) => {
   let response = {}
   try {
    let information = req.body
    if((Object.keys(information).length !== 0)){
        response.ok = true
        response.message = "Patients creating successfully"
        await CreateDocPatients(process.env.COLLECTION_PATIENTS_MONGODB, 
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
       response.message = "An error occurred creating the Patients"
       response.info = error.message
       res.status(500).send(response)
   }
}
// update patients
const UpdatePatients = async (req, res) => {
   let response = {}
   try {
    let information = req.body
    if((Object.keys(information).length !== 0)){
        response.ok = true
        response.message = "Patients updating successfully"
        let _id = req.params.id
        let result = await UpdateDocPatients(process.env.COLLECTION_PATIENTS_MONGODB,
            {_id}, information)
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
       response.message = "An error occurred updating the Patients"
       response.info = error.message
       res.status(500).send(response)
   }
}
// delete patients
const DeletePatients = async (req, res) => {
   let response = {}
   try {
       response.ok = true
       response.message = "Patients deleted successfully"
       let _id = req.params.id
       let result = await DeleteDocPatients(process.env.COLLECTION_PATIENTS_MONGODB,{_id})
       response.info = result
       res.send(response)
   } catch (error) {
       console.log(error)
       response.ok = false
       response.message = "An error occurred deleting the Patients"
       response.info = error.message
       res.status(500).send(response)
   }
}
// export module to export the CRUD
module.exports = {CreatePatients, 
   ReadPatients, 
   ReadsPatients,
   UpdatePatients, 
   DeletePatients}