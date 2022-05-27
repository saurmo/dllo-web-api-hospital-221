// call the mongodb
const { MongoClient, ObjectId } = require("mongodb");
// instantiate the database
const uri = process.env.URI_MONGODB;
// creating a variable for mongodb and calling it later
const client = new MongoClient(uri);
//database connection
const conectDB = async () => {
    await client.connect();
    let DB = client.db(process.env.DB_MONGODB);
    return DB;
};
//read all users saved in this collection appointments types
const ReadsDocPatients = async (collectionPatients) => {
    let db = await conectDB()
    let collection = db.collection(collectionPatients)
    return await collection.find().toArray()
}
//read all users saved in this collection appointments types
const ReadDocPatients = async (collectionPatients, Filterid) => {
    let db = await conectDB()
    let collection = db.collection(collectionPatients)
    Filterid = Filterid ? Filterid : {}
    getFilterID(Filterid, null, true)
    return collection.find(Filterid).toArray()
}
//create a user in the collection
const CreateDocPatients = async (collectionPatients, information) => {    
    let db = await conectDB()
    let collection = db.collection(collectionPatients)
    return await collection.insertOne(information)
}
//create a Appointments type in the collection
const UpdateDocPatients = async (collectionPatients, Filterid, information) => {
    getFilterID(Filterid, information)
    let db = await conectDB()
    let collection = db.collection(collectionPatients)
    return collection.replaceOne(Filterid, information)
}
//delete a Appointments type in the collection
const DeleteDocPatients  = async (collectionPatients, Filterid) => {
    getFilterID(Filterid)
    let db = await conectDB()
    let collection = db.collection(collectionPatients)
    return collection.deleteOne(Filterid)
}
// empty data validation
const getFilterID = (filter, information, isConsult = false) => { 
    if (isConsult) {
      if(filter && filter._id){
        filter._id = new ObjectId(filter._id)
      }
    } else{
      if(filter && filter._id){
        filter._id = new ObjectId(filter._id)
        if (information) { //validacion(nuevoDocumento != null) && nuevoDocumento!=undefined && nuevoDocumento!=false)
            information._id = filter._id
        }
        return // Se sale del metodo
      }else // cuando  obneterFIltroId se invoca desde (modificar o  elminar) y el -id no esta definido se chinga
      {
        throw new Error("Id required")
      }  
    }
   }

module.exports ={ReadDocPatients, 
    ReadsDocPatients, 
    CreateDocPatients,
    UpdateDocPatients, 
    DeleteDocPatients}