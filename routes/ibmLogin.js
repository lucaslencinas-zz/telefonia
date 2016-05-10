var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('Adentro de POST /ibmLogin');
  console.log('REQ.BODY = ' + JSON.stringify(req.body));
  /**
  Nombre:  Apellido:  ID de Lotus Note:  Departamento:  Gerente Nivel 1:  Gerente Nivel 2:
  **/
  db.getConnection(function(err, connection){
    connection.query( db.buildIbmLoginQueryString(req.body), function(err, rows) {
      if (err) {
        throw err;
      }
      console.log('El idIBM es: ', rows[0].idIBM);
      console.log('El nombre es: ', rows[0].nombre);
      console.log('El apellido es: ', rows[0].apellido);
      console.log('El pais es: ', rows[0].pais);
      console.log('El idFManager es: ', rows[0].idFManager);
      console.log('El idSManager es: ', rows[0].idSManager);
      console.log('El deparamento es: ', rows[0].departamento);
      res.json(rows[0]);
      connection.release();
      // Don't use the connection here, it has been returned to the pool.
    });

  });

});


module.exports = router;
