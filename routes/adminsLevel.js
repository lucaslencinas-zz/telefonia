var express = require('express');
var db = require('../db');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log('Adentro de POST /adminsLevel');
  console.log('REQ.BODY = ' + JSON.stringify(req.body));

  db.getConnection(function(err, connection){
    connection.query( db.buildCheckAdminsLevelQueryString(req.body.idIBM), function(err, rows) {
      if (err) {
        throw err;
      }
      if(rows.length == 0){
        console.log("El usuario no es Admin");
        res.json({result: "comun", value: "El usuario no es Admin"});
      }else{
        console.log('Login Correcto');
        res.json({result: "admin", value: rows[0] });
      }
      connection.release();
    });
  });
});


module.exports = router;
