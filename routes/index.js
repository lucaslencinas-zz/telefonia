var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log("adentro del get a /");
  if(req.cookies.fullName == undefined || req.cookies.idIBM == undefined || req.cookies.isManager == undefined){
    res.redirect('login.html');
  }else{
    res.redirect('index.html');
  }
});

module.exports = router;
