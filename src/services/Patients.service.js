const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.URI_MONGODB;

const client = new MongoClient(uri);

const conectDB = async () => {
    await client.connect();
    let DB = client.db(process.env.DB_MONGODB);
    return DB;
};

const ReadsDocPatients = async (collectionPatients) => {
    let db = await conectDB()
    let collection = db.collection(collectionPatients)
    return await collection.find().toArray()
}

const ReadDocPatients = async (collectionPatients, Filterid) => {
    let db = await conectDB()
    let collection = db.collection(collectionPatients)
    Filterid = Filterid ? Filterid : {}
    getFilterID(Filterid, null, true)
    return collection.find(Filterid).toArray()
}

const CreateDocPatients = async (collectionPatients, information) => {    
    let db = await conectDB()
    let collection = db.collection(collectionPatients)
    return await collection.insertOne(information)
}

const UpdateDocPatients = async (collectionPatients, Filterid, information) => {
    getFilterID(Filterid, information)
    let db = await conectDB()
    let collection = db.collection(collectionPatients)
    return collection.replaceOne(Filterid, information)
}

const DeleteDocPatients  = async (collectionPatients, Filterid) => {
    getFilterID(Filterid)
    let db = await conectDB()
    let collection = db.collection(collectionPatients)
    return collection.deleteOne(Filterid)
}

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