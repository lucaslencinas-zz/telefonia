var express = require('express');
var db = require('../db');
var utils = require('../utils');
var router = express.Router();
var request = require("request");

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('Adentro de POST /ibmLogin');
  console.log('REQ.BODY = ' + JSON.stringify(req.body));


  // *** nueva parte
  // var o = JSON.parse(req.body.data);
    var o = req.body;
    o.mail = o.mail.toLowerCase();

    utils.authenticate(o.mail, o.password, function(result) {
        console.log('Completed LDAP lookup');
        if(result.error) {
            console.log(result.error);
            res.json({result: "error", value: "Mail o Password Incorrecto/s"});
        }else{
            // res.end(JSON.stringify(result));
            console.log('Login Correcto');
            var stock_url = "http://bluepages.ibm.com/BpHttpApisv3/slaphapi?ibmperson/mail="+o.mail+".list/byjson";

            request(stock_url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var bp_data = body;
                    var json_bp_data = JSON.parse(body)

                    var managerSN = json_bp_data.search.entry[0].attribute[5].value[0];
                    var lastName = json_bp_data.search.entry[0].attribute[11].value[0];
                    var numEmpleado = json_bp_data.search.entry[0].attribute[19].value[0];
                    var fullName = json_bp_data.search.entry[0].attribute[23].value[0];
                    var firstName = json_bp_data.search.entry[0].attribute[32].value[0];
                    var isManager = json_bp_data.search.entry[0].attribute[33].value[0];

                    console.log("managerSN: ", managerSN);
                    console.log("last Name: ", lastName);
                    console.log("num Empleado: ", numEmpleado);
                    console.log("Full Name: ", fullName);
                    console.log("first Name: ", firstName);
                    console.log("isManager: ", isManager);

                };
            });


            res.json({result: "ok", value: o.mail});
      }
    });
  // *** nueva parte


  /*    Anular query a base local
  db.getConnection(function(err, connection){
    connection.query( db.buildIbmLoginQueryString(req.body), function(err, rows) {
      if (err) {
        throw err;
      }
      if(rows.length == 0){
        console.log("No se encontraron usuarios con ese id y pass");
        res.json({result: "error", value: "Mail o Password Incorrecto/s"});
      }else{
        console.log('Login Correcto');
        res.json({result: "ok", value: rows[0] });
      }
      connection.release();
    });

  });

  */

});


module.exports = router;
