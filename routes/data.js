var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET users listing. */
router.get('/:idUsuario', function(req, res, next) {
  console.log('Adentro de GET /data/' + req.params.idUsuario );

  db.getConnection(function(err, connection){
    connection.query( db.buildGetDataDeUsuarioQueryString(req.params.idUsuario), function(err, rows) {
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
