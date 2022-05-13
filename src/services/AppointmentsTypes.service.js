const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.URI_MONGODB;

const client = new MongoClient(uri);

const conectDB = async () => {
    await client.connect();
    let DB = client.db(process.env.DB_MONGODB);
    return DB;
};

const ReadsDocAppointmentsTypes = async (collectionAppointmentsTypes) => {
    let db = await conectDB()
    let collection = db.collection(collectionAppointmentsTypes)
    return await collection.find().toArray()
}

const ReadDocAppointmentsTypes = async (collectionAppointmentsTypes, Filterid ) => {
    let db = await conectDB()
    let collection = db.collection(collectionAppointmentsTypes)
    Filterid = Filterid ? Filterid : {}
    getFilterID(Filterid, null, true)
    return collection.find().toArray()
}

const CreateDocAppointmentsTypes = async (collectionAppointmentsTypes, information) => {    
    let db = await conectDB()
    let collection = db.collection(collectionAppointmentsTypes)
    let idAppointmentType = information.idAppointmentType
    let name = information.name
    let description = information.description
    return await collection.insertOne(information)
}

const UpdateDocAppointmentsTypes = async (collectionAppointmentsTypes, Filterid, information) => {
    getFilterID(Filterid, information)
    let db = await conectDB()
    let collection = db.collection(collectionAppointmentsTypes)
    return collection.findOneAndUpdate(Filterid, information)
}

const DeleteDocAppointmentsTypes  = async (collectionAppointmentsTypes, Filterid) => {
    getFilterID(Filterid)
    let db = await conectDB()
    let collection = db.collection(collectionAppointmentsTypes)
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
        throw new Error("Id Obligatorio")
      }  
    }
   }

module.exports ={ReadDocAppointmentsTypes, 
    ReadsDocAppointmentsTypes, 
    CreateDocAppointmentsTypes,
    UpdateDocAppointmentsTypes, 
    DeleteDocAppointmentsTypes}