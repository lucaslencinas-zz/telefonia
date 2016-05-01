var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Adentro de GET /servicios');
  db.getConnection(function(err, connection){
    connection.query( 'SELECT * from empleados', function(err, rows) {
      if (err) {
        throw err;
      }
      console.log('El nombre del usuario es: ', rows[0].name);
      console.log('Toda la primera fila es: ', rows[0]);
      connection.release();
      // Don't use the connection here, it has been returned to the pool.
    });

  });
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
  console.log('Adentro de POST /servicios');
  console.log('body: ' + JSON.stringify(req.body));
  db.getConnection(function(err, connection){
    connection.query( db.buildAltaInternoQueryString(req.body), function(err, result) {
      if (err) {
        throw err;
      }
      console.log('Id del registro insertado: ', result.insertId);
      res.json({"id": result.insertId});
      connection.release();
      // Don't use the connection here, it has been returned to the pool.
    });
  });

});

module.exports = router;
