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
//read all users saved in this collection appointments
const ReadsDocAppointments = async (collectionAppointments) => {
    let db = await conectDB()
    let collection = db.collection(collectionAppointments)
    return await collection.find().toArray()
}
//read all users saved in this collection appointments
const ReadDocAppointments = async (collectionAppointments, Filterid ) => {
    let db = await conectDB()
    let collection = db.collection(collectionAppointments)
    Filterid = Filterid ? Filterid : {}
    getFilterID(Filterid, null, true)
    return collection.find(Filterid).toArray()
}
//create a user in the collection
const CreateDocAppointments = async (collectionAppointments, information) => {    
  let db = await conectDB()
  let collection = db.collection(collectionAppointments)
  return await collection.insertOne(information)
}
//modify collection users appointment
const UpdateDocAppointments = async (collectionAppointments, Filterid, information) => {
    getFilterID(Filterid, information)
    let db = await conectDB()
    let collection = db.collection(collectionAppointments)
    return collection.findOneAndUpdate(Filterid, information)
}
//Delete collection appointmensts 
const DeleteDocAppointments  = async (collectionAppointments, Filterid) => {
    getFilterID(Filterid)
    let db = await conectDB()
    let collection = db.collection(collectionAppointments)
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
        throw new Error("Id Obligatorio")
      }  
    }
   }
// Routes
module.exports ={ReadDocAppointments, 
    ReadsDocAppointments, 
    CreateDocAppointments,
    UpdateDocAppointments, 
    DeleteDocAppointments}