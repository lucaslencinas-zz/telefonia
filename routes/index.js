var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log("adentro del get a /");
  if(req.cookies.mail == undefined || req.cookies.password == undefined){
    res.render('login.html');
  }else{
    res.render('index.html');
  }
});

module.exports = router;
