
const bcrypt = require('bcrypt');

const createHash = (data) => {
  return bcrypt.hashSync(data, 12)
}


const hashIsEqualsToData = (data, hash) => {
  return bcrypt.compareSync(data, hash)
}


module.exports = { hashIsEqualsToData, createHash }