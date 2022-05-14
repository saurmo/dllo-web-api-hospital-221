// Services import
const consultingClinicHistoryServices = require('../services/clinicHistory.service')


/**
* Create a Clinic History
* @param {Request} req 
* @param {Response}res 
*/
const createClinicHistory= async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "Clinic History created successfully"
      let information = req.body
      await consultingClinicHistoryServices.createDocumentClinicHistory("clinicHistory", information)
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred creating the Clinic History"
      response.info = error.message
      res.status(500).send(response)
  }

}

/**
 * Read all the Clinic History
 * @param {Request} req 
 * @param {Response} res 
 */
 const readClinicHistory = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "Clinic History read successfully"
      let _id = req.params["id"]
      let result = await consultingClinicHistoryServices.readDocumentClinicHistory("clinicHistory",{ _id })
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred reading the Clinic History"
      response.info = error.message
      res.status(500).send(response)
  }

}


/**
* Read one Clinic History by id
* @param {Request} req 
* @param {Response}res 
*/
const readClinicHistorys = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "Clinic History read successfully"
      let result = await consultingClinicHistoryServices.readDocumentsClinicHistorys("clinicHistory")
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred reading the Clinic History"
      response.info = error.message
      res.status(500).send(response)
  }
}


/**
 * Update a Clinic History
 * @param {Request} req 
 * @param {Response} res 
 */
 const updateClinicHistory = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "Clinic History updated successfully"
      let _id = req.params["id"]
      let information = req.body
      let result = await consultingClinicHistoryServices.updateDocumentClinicHistory("clinicHistory", { _id }, information)
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred updating the Clinic History"
      response.info = error.message
      res.status(500).send(response)
  }
}

/**
 * Delete a Clinic History
 * @param {Request} req 
 * @param {Response} res 
 */
 const deleteClinicHistory = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "Clinic History deleted successfully"
      let _id = req.params["id"]
      let result = await consultingClinicHistoryServices.deleteDocumentClinicHistory("clinicHistory", { _id })
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred deleting the Clinic History"
      response.info = error.message
      res.status(500).send(response)
  }
}

module.exports = {createClinicHistory,readClinicHistory,readClinicHistorys,updateClinicHistory,deleteClinicHistory}  
