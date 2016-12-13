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
      if(rows.length == 0){
        console.log("idIBM no encontrado");
        res.json({result: "error", value: "User ID no encontrado"});
      }else{
        console.log('Login Correcto');
        res.json({result: "ok", value: rows[0] });
      }
      connection.release();
      // Don't use the connection here, it has been returned to the pool.
    });

  });
});


module.exports = router;
