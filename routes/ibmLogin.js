var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('Adentro de POST /ibmLogin');
  console.log('REQ.BODY = ' + JSON.stringify(req.body));

  db.getConnection(function(err, connection){
    connection.query( db.buildIbmLoginQueryString(req.body), function(err, rows) {
      if (err) {
        throw err;
      }
      if(rows.length == 0){
        console.log("No se encontraron usuarios con ese id y pass");
        res.json({result: "error", value: "Mail o Password Incorrecto/s"});
      }else{
        console.log('Login Correcto');
        res.json({result: "ok", value: rows[0] });
      }
      connection.release();
    });

  });

});


module.exports = router;
