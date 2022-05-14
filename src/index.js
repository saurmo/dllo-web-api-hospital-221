// Importacion del framework de express
const express = require('express')
const cors = require('cors');
// Agregar configuracion al process.env
require("../config/index.config")

// Instanciar la aplicacion de express
const app = express()

// Aplicar middleware que permite leer los json del body
app.use(express.json())

// Aplicar middleware cors
// app.use(cors())

// Integrando el router con la app
const facturationRouter = require("./routers/facturacion.router")
const MedicalInstrumentsRouter = require("./routers/medical_instruments.router")
// const MedicamentsRouter = require("./routers/medical_instruments.router")

app.use(facturationRouter);
app.use(MedicalInstrumentsRouter);
// app.use(MedicamentsRouter);


// Puerto donde se levanta el servidor web 
// Puerto donde esta escuchando la API
const PORT = process.env.PORT

// Levantar la API que estará escuchando en el PUERTO 3001
// 1. Primer parametro: Puerto
// 2. Segundo parametro: Callback - Funcion
app.listen(PORT, () => {
  console.log(`API escuchando en: http://localhost:${PORT}`)
})
