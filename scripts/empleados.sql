CREATE TABLE `empleados` (
  `idIBM` varchar(6) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `idFManager` varchar(6) DEFAULT NULL,
  `fManager` varchar(30) DEFAULT NULL,
  `idSManager` varchar(6) DEFAULT NULL,
  `sManager` varchar(30) DEFAULT NULL,
  `rol` varchar(10) DEFAULT NULL,
  `pais` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idIBM`),
  CONSTRAINT chk_rol CHECK (`rol` IN ('comun', 'admin', 'telefonia'))
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;


