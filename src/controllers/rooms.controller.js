const {
    createRoom,
    getRoom,
    updateRoom,
    deleteRoom } = require("../services/rooms.service");

/**
 * 
 * @param {Request} req 
 * @param {Repsonse}res 
 */
const insertRooms = async (req, res) => {

    let response = {}
    try {
        response.ok = true
        response.message = "room added successfully."
        let information = req.body
        await createRoom(process.env.COLLECTION, information)
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred adding the room."
        response.info = error.message
        res.status(500).send(response)
    }

}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const getRooms = async (req, res) => {
    let response = {}
    try {
        response.ok = true
        response.message = "rooms consulted correctly."
        let result = await getRoom(process.env.COLLECTION)
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error has occurred checking the rooms."
        response.info = error.message
        res.status(500).send(response)
    }

}

/**
 *
 * @param {Request} req 
 * @param {Repsonse}res 
 */
const updateRooms = async (req, res) => {
    let response = {}
    try {
        let code = req.body["roomCode"]
        response.ok = true
        response.message = "Room modified successfully"
        let information = req.body
        await updateRoom(process.env.COLLECTION, code, information)
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred modifying the Room."
        response.info = error.message
        res.status(500).send(response)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteRooms = async (req, res) => {
    let response = {}
    try {
        let code = req.params.code;
        response.ok = true
        response.message = "Room removed successfully." 
        let result = await deleteRoom(process.env.COLLECTION,code)
        response.info = result
        res.send(response)
    } catch (error) {
        console.log(error)
        response.ok = false
        response.message = "An error occurred removing the Room."
        response.info = error.message
        res.status(500).send(response)
    }
}


module.exports={
    insertRooms,
    getRooms,
    updateRooms,
    deleteRooms,
}