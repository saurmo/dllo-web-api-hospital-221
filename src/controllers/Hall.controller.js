const hallServices = require("../services/Hall.service")


/**
* 
* @param {Request} req 
* @param {Response}res 
*/
const createHall= async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "hall created successfully"
      let information = req.body
      await hallServices.createDocumentHall("hall", information)
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred creating the  hall"
      response.info = error.message
      res.status(500).send(response)
  }

}


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
 const readHalls = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = " hall read successfully"
      let _id = req.params["id"]
      let result = await hallServices.readDocumentHall("hall",{ _id })
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred reading the hall"
      response.info = error.message
      res.status(500).send(response)
  }

}


/**
* 
* @param {Request} req 
* @param {Response}res 
*/
const readhall = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = "hall read successfully"
      let result = await hallServices.readDocumentHalls("hall")
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred reading the hall"
      response.info = error.message
      res.status(500).send(response)
  }
}


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
 const updateHall = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = " hall updated successfully"
      let _id = req.params["id"]
      let information = req.body
      let result = await hallServices.updateDocumentHalls("hall", { _id }, information)
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred updating the  room"
      response.info = error.message
      res.status(500).send(response)
  }
}


/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
 const deleteHall = async (req, res) => {
  let response = {}
  try {
      response.ok = true
      response.message = " hall deleted successfully"
      let _id = req.params["id"]
      let result = await hallServices.deleteDocumentHalls("hall", { _id })
      response.info = result
      res.send(response)
  } catch (error) {
      console.log(error)
      response.ok = false
      response.message = "An error occurred deleting the  room"
      response.info = error.message
      res.status(500).send(response)
  }
}

module.exports = {createHall,readhall,readHalls,updateHall,deleteHall} 