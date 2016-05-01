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
  var query = "INSERT INTO altainterno (idIBM, nombre, apellido, pais, estado, fManager, sManager, edificio, piso, intReferencia, aparato, voicemail, justificacion)";
  query += " VALUES (" + pedido.idIBM + ",'"  + pedido.nombre + "','"  + pedido.apellido + "','"  + pedido.pais  + "','"  + 'pendiente' + "','"  +  pedido.gerente1 + "','";
  query +=  pedido.gerente2 + "','"  + pedido.edificio + "','"  + pedido.modulo + "',"  + pedido.interno + ",'"  + (pedido.requiereAparato? "SI":"NO") + "','"  + (pedido.requiereVoiceMail? "SI":"NO") + "','"  + pedido.justificacion + "')";
  return query;
};
