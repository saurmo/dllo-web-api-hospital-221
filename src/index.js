// Importacion del framework de express
const express = require('express')
const cors = require('cors');
// Agregar configuracion al process.env
require("../config/index.config")

const http = require('http');


// Instanciar la aplicacion de express
const app = express()
const serverHttp = http.createServer(app);

// Aplicar middleware que permite leer los json del body
app.use(express.json())
// Aplicar middleware cors
app.use(cors())


const { Server } = require("socket.io");
const { SocketHospital } = require("./sockets/index.socket");
const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});
const socketHospital = new SocketHospital(io)

// Integrando el router con la app
const routerPatients = require("./routers/Patients.routers")
const routerappointment = require("./routers/appointment.router")
const routerAppointmentsTypes = require("./routers/AppointmentsTypes.router")
app.use(routerPatients)
app.use(routerAppointmentsTypes)
app.use(routerappointment)

const invoicesRouter = require("./routers/invoices.router")
const MedicalInstrumentsRouter = require("./routers/medical_instruments.router")
const MedicamentsRouter = require("./routers/medicaments.routers")

app.use(invoicesRouter);
app.use(MedicalInstrumentsRouter);
app.use(MedicamentsRouter);
const routerclinicHistory = require("./routers/clinicHistory.router")
const router = require("./routers/index.router");
app.use(routerclinicHistory)
app.use(router)


// Puerto donde se levanta el servidor web 
// Puerto donde esta escuchando la API
const PORT = process.env.PORT

// Levantar la API que estará escuchando en el PUERTO 3001
// 1. Primer parametro: Puerto
// 2. Segundo parametro: Callback - Funcion
serverHttp.listen(PORT, () => {
  console.log(`API escuchando en: http://localhost:${PORT}`)
})
