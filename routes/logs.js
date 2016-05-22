var express = require('express');
var db = require('../db');
var router = express.Router();


router.get('/:nroTicket', function(req, res, next) {
  console.log('Adentro de GET /servicios/' + req.params.nroTicket );

  db.getConnection(function(err, connection){
    connection.query( db.buildGetTicketLogsQueryString(req.params.nroTicket), function(err, rows) {
      if (err) {
        console.log("Hubo un error: " + err);
        throw err;
      }
      if(rows.length == 0){
        console.log("Ticket no encontrado");
        res.json({result: "error", value: "Ticket no encontrado"});
      }else{
        console.log('Ticket encontrado');
        res.json({result: "ok", value: rows });
      }
      connection.release();
      // Don't use the connection here, it has been returned to the pool.
    });

  });
});

module.exports = router;
