## Telefonia - In Progress
> Freelance Project

Web App for managing telecommunication tickets.

#### Programming Languages, Libraries, Frameworks and other tools

 - NodeJs
 - Express
 - Mongo/MySQL
 - Javascript
 - jQuery
 - HTML/CSS
 - Bootstrap

### Environment Setup (Work in progress...)

#### Instalar la base de datos, git, npm, node

Descargar la imagen o .exe de mysql
https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-14-04

base de datos: mysql 5.x

Si el comando mysql no funciona en la terminal —> export PATH=${PATH}:/usr/local/mysql/bin

`mysql -u root -p`

Si no se cual es la contraseña, tengo que resetearla:

- Bajar el sevicio de mysql.
- Darlo de alta con privilegios —> `sudo mysqld_safe --skip-grant-tables`
- En otra consola, conectarme —> `mysql -u root`
- Puede que intente hacer un show database y me salte un error:

`mysql> show databases;`

ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing this statement.

`UPDATE mysql.user SET Password=PASSWORD('root') WHERE User='root';`

http://stackoverflow.com/questions/8541115/mysql-password-issues-mac-os-x-lion

Despues:

Crear la base de datos:

`create database telefonia;`

`use telefonia;`

Crear los esquemas (ejecutar 1 por 1):

_ /telefonia - cd scripts

_ /scripts - ls

acciones.sql        examples.sql        logs.sql
altainterno.sql     ibm_data.sql        telefonia_admin.sql

_ scripts - `export PATH=${PATH}:/usr/local/mysql/bin`

_ scripts - `mysql -u root -p telefonia < ibm_data.sql`
Enter password:

_ scripts - `mysql -u root -p telefonia < acciones.sql`
Enter password:

_ scripts - `mysql -u root -p telefonia < altainterno.sql`
Enter password:

_ scripts - `mysql -u root -p telefonia < logs.sql`
Enter password:

_ scripts - `mysql -u root -p telefonia < telefonia_admin.sql`
Enter password:

_ scripts - `mysql -u root -p telefonia < examples.sql`
Enter password:

#### Installing git:

`sudo apt-get update`

`sudo apt-get install git`

#### Installing node and NPM

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server


####  Iniciar la aplicacion

`npm install`

y despues

`NODE_ENV=development npm start` —> se conecta a una base de datos local (esa configuracion esta en /config/development)

`NODE_ENV=production npm start` —> se conecta a la base de datos en la nube (esa configuracion esta en /config/production)
