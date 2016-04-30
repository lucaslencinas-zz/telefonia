var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Adentro de /users/');
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

module.exports = router;
