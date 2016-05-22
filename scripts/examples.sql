
/*Insert Examples in different tables*/

INSERT INTO telefonia_admin (idIBM, fullName, pais, rol, mail)
VALUES 	(  "pabl11", "Pablo Lencinas", "Argentina", "telefoniaAdmin",  "plencinas@gmail.com"),
        (  "carl13", "Carlos Sanz", "Argentina", "telefoniaLocal", "csanz@gmail.com");

INSERT INTO ibm_data (idIBM, password, fullName, isManager, pais, idFManager, fManager, mailFManager, idSManager, sManager, mailSManager, departamento, mail)
VALUES 	(  "lucas1", "lucas1", "Lucas Lencinas", "N", "Argentina", "diego4", "Diego Carda", "dcarda@gmail.com", "hern12", "Hernan Dominguez", "hdominguez@gmail.com", "finanzas", "llencinas@gmail.com"),
        (  "matia2", "matia2", "Matias Dionisi", "N", "Argentina", "diego4", "Diego Carda", "dcarda@gmail.com", "hern12", "Hernan Dominguez",  "hdominguez@gmail.com",  "finanzas", "mdionisi@gmail.com"),
        (  "jonat3", "jonat3", "Jonatan Belfiori", "N", "Argentina", "rober7", "Roberto Czyrko", "rczyrko@gmail.com",  "hern12", "Hernan Dominguez",  "hdominguez@gmail.com", "finanzas", "jbelfiori@gmail.com"),
        (  "diego4", "diego4", "Diego Carda",  "Y", "Argentina", "hern12", "Hernan Dominguez", "hdominguez@gmail.com",  null, null, null, "finanzas", "dcarda@gmail.com"),
        (  "alici5", "alici5", "Alicia Reyes",  "Y", "Argentina", "hern12", "Hernan Dominguez","hdominguez@gmail.com",  null, null, null, "finanzas", "areyes@gmail.com"),
        (  "luis6", "luis6", "Luis Gotfryd",  "Y", "Argentina", "hern12", "Hernan Dominguez", "hdominguez@gmail.com", null, null, null, "finanzas", "lgotfryd@gmail.com"),
        (  "rober7", "rober7", "Roberto Czyrko", "Y",  "Argentina", "hern12", "Hernan Dominguez", "hdominguez@gmail.com",  null, null, null, "finanzas", "rczyrko@gmail.com"),
        (  "fede8", "fede8", "Fede Aldazabal", "N", "Argentina", "rober7", "Roberto Czyrko", "rczyrko@gmail.com", "hern12", "Hernan Dominguez", "hdominguez@gmail.com", "finanzas", "faldazabal@gmail.com"),
        (  "maria9", "maria9", "Mariano Cimino", "N", "Argentina", "luis6", "Luis Gotfryd", "lgotfryd@gmail.com", "hern12", "Hernan Dominguez", "hdominguez@gmail.com", "finanzas", "mcimino@gmail.com"),
        (  "mart10", "mart10", "Martin Cornejo", "N", "Argentina", "luis6", "Luis Gotfryd", "lgotfryd@gmail.com", "hern12", "Hernan Dominguez", "hdominguez@gmail.com", "finanzas", "mcornejo@gmail.com"),
        (  "hern12", "hern12", "Hernan Dominguez", "Y",  "Argentina", null, null, null, null, null, null, "finanzas", "hdominguez@gmail.com"),
        (  "pabl11", "pabl11", "Pablo Lencinas",  "N", "Argentina", null, null, null, null, null, null, "finanzas", "plencinas@gmail.com"),
        (  "carl13", "carl13", "Carlos Sanz",  "N", "Argentina", null, null, null, null, null, null, "finanzas", "plencinas@gmail.com");

/*Deletes Examples in different tables*/





/*Selects Examples in different tables*/



/*Updates Examples in different tables*/
