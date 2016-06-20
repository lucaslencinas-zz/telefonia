var express = require('express');
var db = require('../db');
var router = express.Router();


router.post('/loginPasswordReset', function(req, res) {
  console.log('Adentro de POST /acciones/loginPasswordReset');
  console.log('body: ' + JSON.stringify(req.body));
/*
  db.getConnection(function(err, connection){
    connection.query( db.buildAprobacionTelefoniaAdminQueryString(req.body), function(err, result) {
      if (err) {
        throw err;
      }
			connection.query( db.buildAprobacionTelefoniaAdminLogQueryString(req.body), function(err2, result2) {
        if (err2) {
          throw err2;
        }
        */
        res.json({"nuevaPassword": "asd123asd"});
/*
        connection.release();
      });
    });
  });
  */
});


router.post('/voiceMailPasswordReset', function(req, res) {
  console.log('Adentro de POST /acciones/voiceMailPasswordReset');
  console.log('body: ' + JSON.stringify(req.body));
  /*
    db.getConnection(function(err, connection){
      connection.query( db.buildAprobacionTelefoniaAdminQueryString(req.body), function(err, result) {
        if (err) {
          throw err;
        }
  			connection.query( db.buildAprobacionTelefoniaAdminLogQueryString(req.body), function(err2, result2) {
          if (err2) {
            throw err2;
          }
          */
          res.json({"nuevaPassword": "asd123asd"});
  /*
          connection.release();
        });
      });
    });
    */
});


module.exports = router;
