CREATE TABLE `empleados` (
  `idIBM` varchar(6) NOT NULL,
  `fullName` varchar(40) NOT NULL,
  `isManager` varchar(1) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `departamento` varchar(30) NOT NULL,
  `idFManager` varchar(6) DEFAULT NULL,
  `fManager` varchar(30) DEFAULT NULL,
  `idSManager` varchar(6) DEFAULT NULL,
  `sManager` varchar(30) DEFAULT NULL,
  `rol` varchar(15) DEFAULT NULL,
  `pais` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idIBM`),
  CONSTRAINT chk_rol CHECK (`rol` IN ('comun', 'telefoniaAdmin', 'telefoniaLocal'))
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
