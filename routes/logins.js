var express = require('express');
var router = express.Router();

/* GET /login. */
router.post('/', function(req, res, next) {
  console.log("adentro del post a /login");
  console.log("parametros que me llegan: " + req.body.usuario + ", " + req.body.password);
  res.send({validUser: true});
});

module.exports = router;
