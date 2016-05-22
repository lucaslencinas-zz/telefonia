var express = require('express');
var db = require('../db');
var router = express.Router();


router.post('/aprobar', function(req, res) {
  console.log('Adentro de POST /manager/aprobar');
  console.log('body: ' + JSON.stringify(req.body));
  db.getConnection(function(err, connection){
    connection.query( db.buildAprobacionManagerQueryString(req.body), function(err, result) {
      if (err) {
        throw err;
      }
			connection.query( db.buildAprobacionManagerLogQueryString(req.body), function(err2, result2) {
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
  console.log('Adentro de POST /manager/aprobar');
  console.log('body: ' + JSON.stringify(req.body));
  db.getConnection(function(err, connection){
    connection.query( db.buildRechazoManagerQueryString(req.body), function(err, result) {
      if (err) {
        throw err;
      }
			connection.query( db.buildRechazoManagerLogQueryString(req.body), function(err2, result2) {
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
