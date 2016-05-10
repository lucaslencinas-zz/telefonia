CREATE TABLE `ibm_data` (
  `idIBM` varchar(6) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `idFManager` varchar(6) DEFAULT NULL,
  `idSManager` varchar(6) DEFAULT NULL,
  `departamento` varchar(20) DEFAULT NULL,
  `pais` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idIBM`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
