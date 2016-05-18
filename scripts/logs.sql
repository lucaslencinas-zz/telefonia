CREATE TABLE `logs`
(
  `idIBM` varchar(20) DEFAULT NULL,
  `fullName` varchar(40) DEFAULT NULL,
  `ticket` mediumint(9) NOT NULL,
  `servicio` varchar(30) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ticket`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
