
const bcrypt = require('bcrypt');

const crearHash = (clave) => {
  return bcrypt.hashSync(clave, 12)
}


const compararHash = (clave, hash) => {
  return bcrypt.compareSync(clave, hash)
}


module.exports = { compararHash, crearHash }