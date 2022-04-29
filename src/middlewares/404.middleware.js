


const notFound = (req, res) => {


    return res.status(404).send({ ok: false, info: null, message: "Endpoint no encontrado." })

}

module.exports = { notFound }