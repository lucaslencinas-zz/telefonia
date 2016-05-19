CREATE TABLE `logs`
(
  `idLog` INT(11) NOT NULL AUTO_INCREMENT,
  `idIBM` varchar(20) NOT NULL,
  `fullName` varchar(40) NOT NULL,
  `ticket` mediumint(9) NOT NULL,
  `servicio` varchar(30) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idLog`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
