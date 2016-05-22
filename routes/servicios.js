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
    connection.query( db.buildCheckAdminUserQueryString(req.params.idUsuario), function(err, rows) {
      if (err) {
        throw err;
      }
      if(rows.length > 0){
        if(rows[0].rol == "telefoniaLocal"){
          console.log('El usuario es un telefoniaLocal');
          connection.query( db.buildGetServiciosDeUsuarioTelefoniaLocalQueryString(req.params.tipoDeServicio, req.params.idUsuario, rows[0].pais), function(err3, rows3) {
            if (err3) {
              throw err3;
            }
            if(rows.length == 0){
              console.log("El usuario no tiene tickets");
              res.json({result: "error", value: "EL usuario no tiene tickets"});
            }else{
            res.json({result: rows[0].rol, value: rows3});
            connection.release();
            }
          });
        }else{
          console.log('El usuario es un telefoniaAdmin');
          connection.query( db.buildGetServiciosDeUsuarioTelefoniaAdminQueryString(req.params.tipoDeServicio, req.params.idUsuario), function(err4, rows4) {
            if (err4) {
              throw err4;
            }
            if(rows.length == 0){
              console.log("El usuario no tiene tickets");
              res.json({result: "error", value: "EL usuario no tiene tickets"});
            }else{
            res.json({result: rows[0].rol, value: rows4});
            connection.release();
            }
          });
        }
        /*res.json({result: row[0].rol, value: row[0]});*/

      }else{
        console.log('El usuario es uno comun');
        connection.query( db.buildGetServiciosDeUsuarioQueryString(req.params.tipoDeServicio, req.params.idUsuario), function(err2, rows2) {
          if (err2) {
            throw err2;
          }
          if(rows.length == 0){
            console.log("El usuario no tiene tickets");
            res.json({result: "error", value: "EL usuario no tiene tickets"});
          }else{
          res.json({result: "comun", value: rows2});
          connection.release();
          }
        });
      }
    });
  });
});

router.get('/:tipoDeServicio/manager/:idUsuario', function(req, res, next) {
  console.log('Adentro de GET /servicios/' + req.params.tipoDeServicio  + "/manager/" + req.params.idUsuario );

  db.getConnection(function(err, connection){
    connection.query( db.buildGetServiciosDeManagerQueryString(req.params.tipoDeServicio, req.params.idUsuario), function(err, rows) {
      if (err) {
        throw err;
      }
      res.json(rows);
      connection.release();
      // Don't use the connection here, it has been returned to the pool.
    });

  });
});


router.get('/:nroTicket', function(req, res, next) {
  console.log('Adentro de GET /servicios/' + req.params.nroTicket );

  db.getConnection(function(err, connection){
    connection.query( db.buildGetTicketInfoQueryString(req.params.nroTicket), function(err, rows) {
      if (err) {
        console.log("Hubo un error: " + err);
        throw err;
      }
      if(rows.length == 0){
        console.log("Ticket no encontrado");
        res.json({result: "error", value: "Ticket no encontrado"});
      }else{
        console.log('Ticket encontrado');
        res.json({result: "ok", value: rows[0] });
      }
      connection.release();
      // Don't use the connection here, it has been returned to the pool.
    });

  });
});

module.exports = router;
