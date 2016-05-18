CREATE TABLE `ibm_data` (
  `idIBM` varchar(6) NOT NULL,
  `password` varchar(20) NOT NULL,
  `fullName` varchar(40) NOT NULL,
  `isManager` varchar(1) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `idFManager` varchar(6) DEFAULT NULL,
  `fManager` varchar(30) DEFAULT NULL,
  `mailFManager` varchar(30) DEFAULT NULL,
  `idSManager` varchar(6) DEFAULT NULL,
  `sManager` varchar(30) DEFAULT NULL,
  `mailSManager` varchar(30) DEFAULT NULL,
  `departamento` varchar(20) DEFAULT NULL,
  `pais` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idIBM`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
