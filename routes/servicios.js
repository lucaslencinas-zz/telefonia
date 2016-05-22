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
          getServiciosDeTelefoniaLocal(res, connection, req.params.tipoDeServicio, req.params.idUsuario, rows[0].pais);
        }else{
          console.log('El usuario es un telefoniaAdmin');
          getServiciosDeTelefoniaAdmin(res, connection, req.params.tipoDeServicio, req.params.idUsuario);
        }
      }else{
        console.log('El usuario es uno comun');
        getServiciosDeUsuarioComun(res, connection, req.params.tipoDeServicio, req.params.idUsuario);
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
      if(rows.length == 0){
        console.log("No se encontraron tickets para el usuario");
        res.json({result: "error", value: "No se encontraron tickets para el usuario"});
      }else{
        res.json({result: "manager", value: rows });
      }
      connection.release();
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
        res.json({result: "ok", value: rows[0] });
      }
      connection.release();
    });

  });
});

/*------------ Helper functions ------------*/

function getServiciosDeTelefoniaLocal(res, connection, tipoServicio, idIBM, pais){
  connection.query( db.buildGetServiciosDeUsuarioTelefoniaLocalQueryString(tipoServicio, idIBM, pais), function(err, rows) {
    if (err) {
      throw err;
    }
    if(rows.length == 0){
      console.log("No se encontraron tickets para el usuario");
      res.json({result: "error", value: "No se encontraron tickets para el usuario"});
    }else{
      res.json({result: rows[0].rol, value: rows});
    }
    connection.release();
  });
}

function getServiciosDeTelefoniaAdmin(res, connection, tipoServicio, idIBM){
  connection.query( db.buildGetServiciosDeUsuarioTelefoniaAdminQueryString(tipoServicio, idIBM), function(err, rows) {
    if (err) {
      throw err;
    }
    if(rows.length == 0){
      console.log("No se encontraron tickets para el usuario");
      res.json({result: "error", value: "No se encontraron tickets para el usuario"});
    }else{
      res.json({result: rows[0].rol, value: rows});
    }
    connection.release();
  });
}

function getServiciosDeUsuarioComun(res, connection, tipoServicio, idIBM){
  connection.query( db.buildGetServiciosDeUsuarioQueryString(tipoServicio, idIBM), function(err, rows) {
    if (err) {
      throw err;
    }
    if(rows.length == 0){
      console.log("No se encontraron tickets para el usuario");
      res.json({result: "error", value: "No se encontraron tickets para el usuario"});
    }else{
    res.json({result: "comun", value: rows});
    }
    connection.release();
  });
}




module.exports = router;
