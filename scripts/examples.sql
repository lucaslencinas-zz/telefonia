
/*Insert Examples in different tables*/

INSERT INTO empleados (idIBM, nombre, apellido, pais, idFManager, fManager, idSManager, sManager, rol)
VALUES (  "lucas1", "Lucas", "Lencinas", "Argentina", "jefe12", "Hernan", "jefe34", "Patricia", "comun");

INSERT INTO ibm_data (idIBM, password, nombre, apellido, pais, idFManager, idSManager)
VALUES (  "lucas1", "lucas1", "Lucas", "Lencinas", "Argentina", "jefe12", "jefe34");

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


/*Deletes Examples in different tables*/





/*Selects Examples in different tables*/

SELECT idIBM, nombre, apellido, pais, idFManager, idSManager, departamento
FROM ibm_data
WHERE (idIBM = "lucas1" AND password = "lucas1");






/*Updates Examples in different tables*/
