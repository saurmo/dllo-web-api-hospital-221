const express = require("express");

const router = express.Router();

// const auth_ctr = require("../controllers/auth.controller")
// const { requestValid } = require('../middlewares/token.middleware')
// const { notFound } = require('../middlewares/404.middleware')

const rooms = require("../controllers/rooms.controller")

const vs = "/api/v1";

router
  .get(`/`, (req, res) => {
    res.send("Proyecto de aula Hospital");
  })
  .get(vs + "/rooms", rooms.getRooms)
  .get(vs + "/rooms/:roomcode", rooms.getroom)
  .post(vs + "/rooms", rooms.insertRooms)
  .put(vs + "/rooms", rooms.updateRooms)
  .delete(
    vs + "/rooms/:code",
    rooms.deleteRooms
  )
//router.use(requestValid);

//router.use(notFound);

module.exports = router;
