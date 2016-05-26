var express = require('express');
var db = require('../db');
var router = express.Router();


router.post('/aprobar', function(req, res) {
  console.log('Adentro de POST /telefoniaLocal/aprobar');
  console.log('body: ' + JSON.stringify(req.body));
  db.getConnection(function(err, connection){
    connection.query( db.buildAprobacionTelefoniaLocalQueryString(req.body), function(err, result) {
      if (err) {
        throw err;
      }
			connection.query( db.buildAprobacionTelefoniaLocalLogQueryString(req.body), function(err2, result2) {
        if (err2) {
          throw err2;
        }
        console.log('Id del registro modificado: ', result.insertId);
        res.json({"id": result.insertId});
        connection.release();
      });
    });
  });
});


router.post('/rechazar', function(req, res) {
  console.log('Adentro de POST /telefoniaLocal/rechazar');
  console.log('body: ' + JSON.stringify(req.body));
  db.getConnection(function(err, connection){
    connection.query( db.buildRechazoTelefoniaLocalQueryString(req.body), function(err, result) {
      if (err) {
        throw err;
      }
			connection.query( db.buildRechazoTelefoniaLocalLogQueryString(req.body), function(err2, result2) {
        if (err2) {
          throw err2;
        }
        console.log('Id del registro modificado: ', result.insertId);
        res.json({"id": result.insertId});
        connection.release();
      });
    });
  });
});


module.exports = router;
