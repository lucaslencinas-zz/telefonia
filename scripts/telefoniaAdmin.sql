CREATE TABLE `telefoniaAdmin` (
  `idIBM` varchar(6) NOT NULL,
  `fullName` varchar(40) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `rol` varchar(15) DEFAULT NULL,
  `pais` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idIBM`),
  CONSTRAINT chk_rol CHECK (`rol` IN ('telefoniaAdmin', 'telefoniaLocal'))
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
