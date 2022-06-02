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
const ReadsDocAppointmentsTypes = async (collectionAppointmentsTypes) => {
    let db = await conectDB()
    let collection = db.collection(collectionAppointmentsTypes)
    return await collection.find().toArray()
}
//read all users saved in this collection appointments types
const ReadDocAppointmentsTypes = async (collectionAppointmentsTypes, Filterid) => {
    let db = await conectDB()
    let collection = db.collection(collectionAppointmentsTypes)
    Filterid = Filterid ? Filterid : {}
    getFilterID(Filterid, null, true)
    return collection.find(Filterid).toArray()
}
//create a user in the collection
const CreateDocAppointmentsTypes = async (collectionAppointmentsTypes, information) => {    
    let db = await conectDB()
    let collection = db.collection(collectionAppointmentsTypes)
    return await collection.insertOne(information)
}
//create a Appointments type in the collection
const UpdateDocAppointmentsTypes = async (collectionAppointmentsTypes, Filterid, information) => {
    getFilterID(Filterid, information)
    let db = await conectDB()
    let collection = db.collection(collectionAppointmentsTypes)
    return collection.replaceOne(Filterid, information)
}
//delete a Appointments type in the collection
const DeleteDocAppointmentsTypes  = async (collectionAppointmentsTypes, Filterid) => {
    getFilterID(Filterid)
    let db = await conectDB()
    let collection = db.collection(collectionAppointmentsTypes)
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
// modulo de exportacion 
module.exports ={ReadDocAppointmentsTypes, 
    ReadsDocAppointmentsTypes, 
    CreateDocAppointmentsTypes,
    UpdateDocAppointmentsTypes, 
    DeleteDocAppointmentsTypes}