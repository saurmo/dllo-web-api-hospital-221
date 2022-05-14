const { MongoClient } = require("mongodb");

const uri = process.env.URIMONGODB 

const client = new MongoClient(uri);

const connectDB = async  ()=>{
//connect the client to the server
await client.connect();
let DB = client.db(process.env.DB_MONGODB)
return DB;
}

/**
 * validate if empty data
 * @param {*} data 
 * @returns 
 */
const validateEmptyData = (data) => {
    if (Object.keys(data).length === 0) {
        throw new Error("You are trying to enter an empty room, please enter the room code and the idhall at least")
    }
    return false
}

/**
 * It finds one document of room  without error management
 * @param {*} collection_name 
 * @param {*} roomcode 
 * @returns 
 */
 const findOne = async (collection_name, roomcode) => {
    let db = await connectDB()
    let collection = db.collection(collection_name)
    let result = await collection.find({ roomCode: roomcode }).toArray()
    return result
}

/**
 * create rooms  in  mongodb 
 * @param {*} collection 
 * @param {*} information 
 * @returns 
 */
const createRoom = async (collection,information) => { 
    let roomcode = information.roomCode
    let idhall = information.idHall
    if (!validateEmptyData(information)) {
        if (roomcode.length === 0 || idhall.length === 0) {
            throw new Error("roomcode and idHall are required for the room to be saved.")
        }
        result = await findOne(collection, roomcode)
        if (result.length !== 0) {
            throw new Error("The roomcode already exists, please enter a different one.")
        }
    }
    let db = await connectDB()
    let collectionone = db.collection(collection)
    return await collectionone.insertOne(information)     
    
}

/**
 * it find rooms 
 * @param {*} colletionName 
 * @returns 
 */
const getRoom = async (colletionName) => {
    let db = await connectDB()
    let coleccion = db.collection(colletionName)
    let result = coleccion.find({}).toArray()
    return result
}

/**
 * this only find  one room 
 * @param {*} colletionName 
 * @param {*} code 
 * @returns 
 */
 const getRoomcode = async (colletionName,code) => {
    let result = await findOne(colletionName, code)
    if (result.length === 0) {
        throw new Error("The room does not exist")
    }
    return result
}

/**
 *  update room  in mongodb using roomcode 
 * @param {*} collection 
 * @param {*} code 
 * @param {*} information 
 * @returns 
 */
const updateRoom = async (collection, code, information) => {
    let db = await connectDB()
    let collectionone = db.collection(collection)
    let filter = {"roomCode": code}
    let data = {$set: information}
    return collectionone.findOneAndUpdate(filter, data)
}


/**
 *  delete room using roomcode
 * @param {*} collection 
 * @param {*} code 
 * @returns 
 */
 const deleteRoom = async(collection,code) => { 
    let db = await connectDB()
    let collection_ =db.collection(collection)
    let filter = {"roomCode": code}
    await collection_.findOneAndDelete(filter)
    let resultado = "Room removed"
    return resultado
}


module.exports= {
    createRoom,
    getRoom,
    getRoomcode,
    updateRoom,
    deleteRoom } 
