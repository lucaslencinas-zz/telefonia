CREATE TABLE `acciones` (
  `idIBM` varchar(6) NOT NULL,
  `accionId` mediumint(9) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(40) DEFAULT NULL,
  `servicio` varchar(30) NOT NULL, /* (ej: reset password voicemail) */
  `ticketRef` mediumint(9) NOT NULL,
  `servicioRef` varchar(30) NOT NULL, /* (ej: altainterno) */
  `nivelAprobacion` int(11) NOT NULL, /* 0: noRequiere, 1:aprobacion 1er Manager, 2: aprobacion 2do Manager */
  `estado` varchar(30) DEFAULT NULL,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFManager` datetime DEFAULT NULL,
  `fechaSManager` datetime DEFAULT NULL,
  `fechaTelefoniaLocal` datetime DEFAULT NULL,
  `fechaTelefoniaAdmin` datetime DEFAULT NULL,
  `fechaCerrado` datetime DEFAULT NULL,
  `justificacion` varchar(200) DEFAULT NULL,
  `motivoFManager` varchar(100) DEFAULT NULL,
  `motivoSManager` varchar(100) DEFAULT NULL,
  `motivoTelefoniaLocal` varchar(100) DEFAULT NULL,
  `motivoTelefoniaAdmin` varchar(100) DEFAULT NULL,
  CONSTRAINT chk_estado CHECK (`estado` IN ('rechazado', 'pendienteGerente', 'pendienteTelefoniaLocal', 'pendienteTelefoniaAdmin', 'aprobado')),
  PRIMARY KEY (`accionId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
