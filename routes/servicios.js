var express = require('express');
var db = require('../db');
var router = express.Router();


router.post('/', function(req, res) {
  console.log('Adentro de POST /servicios');
  console.log('body: ' + JSON.stringify(req.body));
  db.getConnection(function(err, connection){
    connection.query( db.buildAltaInternoQueryString(req.body), function(err, result) {
      if (err) {
        throw err;
      }
			connection.query( db.buildAltaInternoLogQueryString(req.body, result.insertId), function(err2, result2) {
        if (err2) {
          throw err2;
        }
        console.log('Id del registro insertado: ', result.insertId);
        res.json({"id": result.insertId});
        connection.release();
      });
    });
  });
});


router.get('/:tipoDeServicio/:idUsuario', function(req, res, next) {
  console.log('Adentro de GET /servicios/' + req.params.tipoDeServicio  + "/" + req.params.idUsuario );

  db.getConnection(function(err, connection){
    connection.query( db.buildGetServiciosDeUsuarioQueryString(req.params.tipoDeServicio, req.params.idUsuario), function(err, rows) {
      if (err) {
        throw err;
      }
      res.json(rows);
      connection.release();
      // Don't use the connection here, it has been returned to the pool.
    });

  });
});

module.exports = router;
