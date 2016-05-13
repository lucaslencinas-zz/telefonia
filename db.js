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
  var query = "INSERT INTO altainterno (idIBM, nombre, apellido, pais, estado, fManager, sManager, edificio, piso, departamento, intReferencia, aparato, voicemail, justificacion)";
  query += " VALUES ('" + pedido.idIBM + "','"  + pedido.nombre + "','"  + pedido.apellido + "','"  + pedido.pais  + "','"  + 'pendienteGerente' + "','"  +  pedido.gerente1 + "','";
  query +=  pedido.gerente2 + "','"  + pedido.edificio + "','"  + pedido.modulo + "','" + pedido.departamento + "',"  + pedido.interno + ",'"  + (pedido.requiereAparato? "SI":"NO") + "','"  + (pedido.requiereVoiceMail? "SI":"NO") + "','"  + pedido.justificacion + "')";
  console.log(query);
  return query;
};


exports.buildIbmLoginQueryString = function(pedido) {
  var query = "SELECT  idIBM, nombre, apellido, pais, idFManager, idSManager, departamento";
  query += " FROM ibm_data ";
  query +=  "WHERE (idIBM = '" + pedido.idIBM + "' AND password = '" + pedido.password + "')";
  console.log(query);
  return query;
};

exports.buildGetServiciosDeUsuarioQueryString = function(tipoDeServicio, idUsuario){
	var typesWhereClause = {
			"aprobados":"AND estado = 'aprobado')",
			"pendientes":"AND (estado = 'pendienteTelefonia' OR estado = 'pendienteGerente'))",
			"rechazados":"AND estado = 'rechazado')",
			"todos": ")"
		};

	var query = "SELECT idIBM, nombre, apellido, pais, ticket, estado, fManager, sManager, edificio, piso, intReferencia, aparato, voicemail, justificacion ";
  query += "FROM  altainterno ";
  query += "WHERE (idIBM = '" + idUsuario + "' ";/*le falta el cierre del parentesis, lo agrega la linea de abajo*/
	query += typesWhereClause[tipoDeServicio];
  console.log(query);
  return query;
};
