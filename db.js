var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host     : 'us-cdbr-iron-east-03.cleardb.net',
  user     : 'b907d8d6e3ab57',
  password : '06e49fb8',
  database : 'heroku_74c23f2458ff8ba'
});

exports.getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

exports.buildAltaInternoQueryString = function(pedido) {
  var query = "INSERT INTO altainterno (idIBM, fullName, pais, estado, fManager, sManager, idFManager, idSManager, edificio, piso, departamento, intReferencia, aparato, voicemail, justificacion, fechaInicio, nivelAprobacion, servicio, tipo, discado)";
  query += " VALUES ('" + pedido.idIBM + "','"  + pedido.fullName + "','"  + pedido.pais  + "','"  + 'pendienteGerente' + "','"  +  pedido.gerente1 + "','";
  query += pedido.gerente2 + "','" + pedido.idGerente1 + "','" + pedido.idGerente2 + "','" + pedido.edificio + "','"  + pedido.piso + "','" + pedido.departamento + "',"  + parseInt(pedido.interno, 10) + ",'";
  query += (pedido.requiereAparato? "SI":"NO") + "','"  + (pedido.requiereVoiceMail? "SI":"NO") + "','" + pedido.justificacion + "', '" + pedido.fechaInicio + "', " + 1 + ", 'AltaInterno', 'Alta', '" + pedido.discado + "')";
  console.log(query);
  return query;
};


exports.buildIbmLoginQueryString = function(pedido) {
  var query = "SELECT  mail, idIBM, fullName, pais, idFManager, idSManager, departamento, isManager";
  query += " FROM ibm_data ";
  query +=  "WHERE (mail = '" + pedido.mail + "' AND password = '" + pedido.password + "')";
  console.log(query);
  return query;
};

exports.buildGetServiciosDeUsuarioQueryString = function(tipoDeServicio, idUsuario){
	var typesWhereClause = {
			"aprobados":"AND estado = 'aprobado')",
			"pendientes":"AND (estado = 'pendienteTelefoniaAdmin' OR estado = 'pendienteGerente' OR estado = 'pendienteTelefoniaLocal'))",
			"rechazados":"AND estado = 'rechazado')",
			"todos": ")"
		};

	var query = "SELECT idIBM, fullName, pais, ticket, estado, fechaInicio, fManager, sManager, idFManager, idSManager, edificio, piso, intReferencia, aparato, voicemail, justificacion ";
  query += "FROM  altainterno ";
  query += "WHERE (idIBM = '" + idUsuario + "' ";/*le falta el cierre del parentesis, lo agrega la linea de abajo*/
	query += typesWhereClause[tipoDeServicio];
  console.log(query);
  return query;
};

exports.buildGetServiciosDeManagerQueryString = function(tipoDeServicio, idUsuario){
	var typesWhereClause = {
			"aprobados":"AND estado = 'aprobado'",
			"pendientes":"AND (estado = 'pendienteTelefoniaAdmin' OR estado = 'pendienteGerente' OR estado = 'pendienteTelefoniaLocal')",
			"rechazados":"AND estado = 'rechazado'",
			"todos": ""
		};

	var query = "SELECT idIBM, fullName, pais, ticket, estado, fechaInicio, fManager, sManager, idFManager, idSManager, edificio, piso, intReferencia, aparato, voicemail, justificacion ";
  query += "FROM  altainterno ";
  query += "WHERE (idIBM = '" + idUsuario + "' OR idFManager = '" + idUsuario + "') ";/*le falta el cierre del parentesis, lo agrega la linea de abajo*/
	query += typesWhereClause[tipoDeServicio];
  console.log(query);
  return query;
};

exports.buildGetServiciosDeUsuarioTelefoniaLocalQueryString = function(tipoDeServicio, idUsuario, pais){
  var typesWhereClause = {
      "aprobados":"AND estado = 'aprobado'",
      "pendientes":"AND (estado = 'pendienteTelefoniaAdmin' OR estado = 'pendienteGerente' OR estado = 'pendienteTelefoniaLocal')",
      "rechazados":"AND estado = 'rechazado'",
      "todos": ""
    };

  var query = "SELECT idIBM, fullName, pais, ticket, estado, fechaInicio, fManager, sManager, idFManager, idSManager, edificio, piso, intReferencia, aparato, voicemail, justificacion ";
  query += "FROM  altainterno ";
  query += "WHERE (idIBM = '" + idUsuario + "' OR pais = '" + pais + "') ";/*le falta el cierre del parentesis, lo agrega la linea de abajo*/
  query += typesWhereClause[tipoDeServicio];
  console.log(query);
  return query;
}

exports.buildGetServiciosDeUsuarioTelefoniaAdminQueryString = function(tipoDeServicio, idUsuario){
  var typesWhereClause = {
      "aprobados":"WHERE estado = 'aprobado'",
      "pendientes":"WHERE (estado = 'pendienteTelefoniaAdmin' OR estado = 'pendienteGerente' OR estado = 'pendienteTelefoniaLocal')",
      "rechazados":"WHERE estado = 'rechazado'",
      "todos": ""
    };

  var query = "SELECT idIBM, fullName, pais, ticket, estado, fechaInicio, fManager, sManager, idFManager, idSManager, edificio, piso, intReferencia, aparato, voicemail, justificacion ";
  query += "FROM  altainterno ";
  query += typesWhereClause[tipoDeServicio];
  console.log(query);
  return query;
}

exports.buildAltaInternoLogQueryString = function(pedido, ticket){
	var query = "INSERT INTO logs (idIBM, fullName, ticket, servicio, descripcion) ";
	query += "VALUES ('" + pedido.idIBM + "', '" + pedido.fullName + "', " + ticket + ", 'Alta de Interno', 'El usuario " + pedido.fullName + " ha creado el ticket nro " + ticket + "')";
	query += ",('" + pedido.idIBM + "', '" + pedido.fullName + "', " + ticket + ", 'Cambio de Estado', 'El ticket nro " + ticket + " esta pendienteGerente')";
  console.log(query);
  return query;
}

exports.buildGetDataDeUsuarioQueryString = function(idIBM){
  var query = "SELECT  idIBM, fullName, departamento, idFManager, fManager, idSManager, sManager";
  query += " FROM ibm_data ";
  query +=  "WHERE (idIBM = '" + idIBM + "')";
  console.log(query);
  return query;
}

exports.buildCheckAdminsLevelQueryString = function(idIBM){
  var query = "SELECT  idIBM, fullName, rol, pais ";
  query += "FROM telefonia_admin ";
  query += "WHERE (idIBM = '" + idIBM + "')";
  console.log(query);
  return query;
}

exports.buildGetTicketInfoQueryString = function(ticket){
  var query = "SELECT * ";
  query += "FROM  altainterno ";
  query += "WHERE (ticket = " + ticket + ")";
  console.log(query);
  return query;
}

exports.buildGetTicketLogsQueryString = function(ticket){
  var query = "SELECT * ";
  query += "FROM  logs ";
  query += "WHERE (ticket = " + ticket + ")";
  console.log(query);
  return query;
}

exports.buildCheckAdminUserQueryString = function(idIBM){
  var query = "SELECT * ";
  query += "FROM  telefonia_admin ";
  query += "WHERE (idIBM = '" + idIBM + "')";
  console.log(query);
  return query;
}



/*-----------------Queries para aprobaciones y rechazos------------------*/

exports.buildAprobacionManagerLogQueryString = function(pedido){
  var query = "INSERT INTO logs (idIBM, fullName, ticket, servicio, descripcion) ";
  query += "VALUES ('" + pedido.idIBM + "', '" + pedido.fullName + "', " + pedido.ticket + ", 'Cambio de Estado', " + "'" + pedido.fullName + " ha cambiado el estado del ticket nro " + pedido.ticket + " a pendienteTelefoniaLocal')";
  console.log(query);
  return query;
}

exports.buildAprobacionManagerQueryString = function(pedido){
  var query = "UPDATE altainterno SET ";
  query += "estado = 'pendienteTelefoniaLocal'," + " fechaFManager = '" + pedido.fecha + "' ";
  query += "WHERE ticket = '" + pedido.ticket + "'";
  console.log(query);
  return query;
}

exports.buildRechazoManagerLogQueryString = function(pedido){
  var query = "INSERT INTO logs (idIBM, fullName, ticket, servicio, descripcion) ";
  query += "VALUES ('" + pedido.idIBM + "', '" + pedido.fullName + "', " + pedido.ticket + ", 'Cambio de Estado', " + "'" + pedido.fullName + " ha cambiado el estado del ticket nro " + pedido.ticket + " a rechazado')";
  query += " ,('" + pedido.idIBM + "', '" + pedido.fullName + "', " + pedido.ticket + ", 'Cambio de Estado', " + "'" + pedido.fullName + " ha cambiado el estado del ticket nro " + pedido.ticket + " a cerrado')";
  console.log(query);
  return query;
}

exports.buildRechazoManagerQueryString = function(pedido){
  var query = "UPDATE altainterno SET ";
  query += "estado = 'rechazado'," + " fechaFManager = '" + pedido.fecha + "', motivoFManager = '" + pedido.motivo + "' ";
  query += "WHERE ticket = '" + pedido.ticket + "'";
  console.log(query);
  return query;
}




exports.buildAprobacionTelefoniaLocalLogQueryString = function(pedido){
  var query = "INSERT INTO logs (idIBM, fullName, ticket, servicio, descripcion) ";
  query += "VALUES ('" + pedido.idIBM + "', '" + pedido.fullName + "', " + pedido.ticket + ", 'Cambio de Estado', " + "'" + pedido.fullName + " ha cambiado el estado del ticket nro " + pedido.ticket + " a pendienteTelefoniaAdmin')";
  console.log(query);
  return query;
}

exports.buildAprobacionTelefoniaLocalQueryString = function(pedido){
  var query = "UPDATE altainterno SET ";
  query += "estado = 'pendienteTelefoniaAdmin'," + " fechaTelefoniaLocal = '" + pedido.fecha + "'," + " macAddress = '" + pedido.mac + "',";
  query += " marca = '" + pedido.marca + "',"  + " serie = '" + pedido.serie + "'," + " modelo = '" + pedido.modelo + "' "
  query += "WHERE ticket = '" + pedido.ticket + "'";
  console.log(query);
  return query;
}

exports.buildRechazoTelefoniaLocalLogQueryString = function(pedido){
  var query = "INSERT INTO logs (idIBM, fullName, ticket, servicio, descripcion) ";
  query += "VALUES ('" + pedido.idIBM + "', '" + pedido.fullName + "', " + pedido.ticket + ", 'Cambio de Estado', " + "'" + pedido.fullName + " ha cambiado el estado del ticket nro " + pedido.ticket + " a rechazado')";
  query += " ,('" + pedido.idIBM + "', '" + pedido.fullName + "', " + pedido.ticket + ", 'Cambio de Estado', " + "'" + pedido.fullName + " ha cambiado el estado del ticket nro " + pedido.ticket + " a cerrado')";
  console.log(query);
  return query;
}

exports.buildRechazoTelefoniaLocalQueryString = function(pedido){
  var query = "UPDATE altainterno SET ";
  query += "estado = 'rechazado'," + " fechaTelefoniaLocal = '" + pedido.fecha + "', motivoTelefoniaLocal = '" + pedido.motivo + "' ";
  query += "WHERE ticket = '" + pedido.ticket + "'";
  console.log(query);
  return query;
}




exports.buildAprobacionTelefoniaAdminLogQueryString = function(pedido){
  var query = "INSERT INTO logs (idIBM, fullName, ticket, servicio, descripcion) ";
  query += "VALUES ('" + pedido.idIBM + "', '" + pedido.fullName + "', " + pedido.ticket + ", 'Cambio de Estado', " + "'" + pedido.fullName + " ha cambiado el estado del ticket nro " + pedido.ticket + " a aprobado')";
  query += " ,('" + pedido.idIBM + "', '" + pedido.fullName + "', " + pedido.ticket + ", 'Cambio de Estado', " + "'" + pedido.fullName + " ha cambiado el estado del ticket nro " + pedido.ticket + " a cerrado')";
  console.log(query);
  return query;
}

exports.buildAprobacionTelefoniaAdminQueryString = function(pedido){
  var query = "UPDATE altainterno SET ";
  query += "estado = 'aprobado'," + " fechaTelefoniaAdmin = '" + pedido.fecha + "' ";
  query += "WHERE ticket = '" + pedido.ticket + "'";
  console.log(query);
  return query;
}

exports.buildRechazoTelefoniaAdminLogQueryString = function(pedido){
  var query = "INSERT INTO logs (idIBM, fullName, ticket, servicio, descripcion) ";
  query += "VALUES ('" + pedido.idIBM + "', '" + pedido.fullName + "', " + pedido.ticket + ", 'Cambio de Estado', " + "'" + pedido.fullName + " ha cambiado el estado del ticket nro " + pedido.ticket + " a rechazado')";
  query += " ,('" + pedido.idIBM + "', '" + pedido.fullName + "', " + pedido.ticket + ", 'Cambio de Estado', " + "'" + pedido.fullName + " ha cambiado el estado del ticket nro " + pedido.ticket + " a cerrado')";
  console.log(query);
  return query;
}

exports.buildRechazoTelefoniaAdminQueryString = function(pedido){
  var query = "UPDATE altainterno SET ";
  query += "estado = 'rechazado'," + " fechaTelefoniaAdmin = '" + pedido.fecha + "', motivoTelefoniaAdmin = '" + pedido.motivo + "' ";
  query += "WHERE ticket = '" + pedido.ticket + "'";
  console.log(query);
  return query;
}
