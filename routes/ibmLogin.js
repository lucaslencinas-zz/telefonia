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
      console.log('El idIBM es: ', rows[0].idIBM);
      console.log('El fullName es: ', rows[0].fullName);
      res.json(rows[0]);
      connection.release();
    });

  });

});


module.exports = router;
