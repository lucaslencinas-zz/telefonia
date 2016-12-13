var express = require('express');
var db = require('../db');
var router = express.Router();
var mailgun = require('../mailsender')
var randomstring = require("randomstring");


router.post('/loginPasswordReset', function(req, res) {
  console.log('Adentro de POST /acciones/loginPasswordReset');
  console.log('body: ' + JSON.stringify(req.body));

  db.getConnection(function(err, connection){
    connection.query( db.buildCreatePasswordLoginResetQueryString(req.body), function(err, result) {
      if (err) {
        throw err;
      }
			connection.query( db.buildCreatePasswordLoginResetLogQueryString(req.body), function(err2, result2) {
        if (err2) {
          throw err2;
        }
        var temporaryPassword = randomstring.generate({
          length: 6,
          charset: 'alphanumeric'
        });
        var content = {
          title: "Login Password Reset - Telefonia",
          text: "Usted ha solicitado un reset de password de login. Utilice la siguiente contraseña para ingresar: "
        };
        sendTempPasswordByEmail(temporaryPassword, res, connection, content);
      });
    });
  });
});

router.post('/voiceMailPasswordReset', function(req, res) {
  console.log('Adentro de POST /acciones/voiceMailPasswordReset');
  console.log('body: ' + JSON.stringify(req.body));
  db.getConnection(function(err, connection){
    connection.query( db.buildCreatePasswordVoiceMailResetQueryString(req.body), function(err, result) {
      if (err) {
        throw err;
      }
			connection.query( db.buildCreatePasswordVoiceMailResetLogQueryString(req.body), function(err2, result2) {
        if (err2) {
          throw err2;
        }
        var temporaryPassword = randomstring.generate({
          length: 8,
          charset: 'numeric'
        });
        var content = {
          title: "VoiceMail Password Reset - Telefonia",
          text: "Usted ha solicitado un reset de password de VoiceMail. Utilice la siguiente contraseña para ingresar: "
        };
        sendTempPasswordByEmail(temporaryPassword, res, connection, content);
      });
    });
  });
});

function sendTempPasswordByEmail(password, res, connection, content){
  console.log('enviar password: ' + password + ' por email');
  // setup e-mail data with unicode symbols
  var data = {
    from: 'Base Telefonia <basetelefonia@company.com>',
    to: 'lllencinas@gmail.com',
    subject: content.title,
    text: content.text + password
  };

  mailgun.mailsender.messages().send(data, function (error, body) {
    if(error)
      throw error;

    console.log(body);
    res.json({"nuevaPassword": password});
    connection.release();
  });
}

module.exports = router;
