// Services import
const consultingRoomsServices = require('../services/consultingRooms.service')


/**
* Create a consulting rooms
* @param {Request} req 
* @param {Response}res 
*/
const createConsultingRooms= async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "Consulting room created successfully"
      let information = req.body
      await consultingRoomsServices.createDocumentConsultingRooms("consultingRooms", information)
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred creating the consulting rooms"
      response.info = error.message
      res.status(500).send(response)
  }

}


/**
 * Read all the consulting rooms
 * @param {Request} req 
 * @param {Response} res 
 */
 const readConsultingRoom = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "Consulting room read successfully"
      let _id = req.params["id"]
      let result = await consultingRoomsServices.readDocumentConsultingRoom("consultingRooms",{ _id })
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred reading the consulting room"
      response.info = error.message
      res.status(500).send(response)
  }

}


/**
* Read one consulting rooms by id
* @param {Request} req 
* @param {Response}res 
*/
const readConsultingRooms = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "Consulting rooms read successfully"
      let result = await consultingRoomsServices.readDocumentsConsultingRooms("consultingRooms")
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred reading the consulting rooms"
      response.info = error.message
      res.status(500).send(response)
  }
}


/**
 * Update a consulting room
 * @param {Request} req 
 * @param {Response} res 
 */
 const updateConsultingRooms = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "Consulting room updated successfully"
      let _id = req.params["id"]
      let information = req.body
      let result = await consultingRoomsServices.updateDocumentConsultingRooms("consultingRooms", { _id }, information)
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred updating the consulting room"
      response.info = error.message
      res.status(500).send(response)
  }
}


/**
 * Delete a consulting room
 * @param {Request} req 
 * @param {Response} res 
 */
 const deleteConsultingRooms = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "Consulting room deleted successfully"
      let _id = req.params["id"]
      let result = await consultingRoomsServices.deleteDocumentConsultingRooms("consultingRooms", { _id })
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred deleting the consulting room"
      response.info = error.message
      res.status(500).send(response)
  }
}

module.exports = {createConsultingRooms,readConsultingRoom,readConsultingRooms,updateConsultingRooms,deleteConsultingRooms}  