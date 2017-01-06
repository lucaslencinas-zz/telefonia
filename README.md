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

#### Installing git:

`sudo apt-get update`

`sudo apt-get install git`

#### Installing MySQL:

Descargar la imagen o .exe de mysql
https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-14-04

base de datos: mysql 5.x

`sudo apt-get update`

`sudo apt-get install mysql-server`

`sudo mysql_secure_installation`

`sudo mysql_install_db`

Despues:

Crear la base de datos:

`create database telefonia;`

`use telefonia;`

Crear los esquemas (ejecutar 1 por 1):

Descargar este repo e ir a la carpeta donde estan los scripts:

_ /telefonia - cd scripts

_ /scripts - ls

acciones.sql        examples.sql        logs.sql
altainterno.sql     ibm_data.sql        telefonia_admin.sql

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

#### Installing node and NPM

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server

`sudo apt-get install npm`

`sudo apt-get install nodejs`

`sudo apt-get install nodejs-legacy`

####  Iniciar la aplicacion

`npm install`

y despues

`NODE_ENV=development npm start` —> se conecta a una base de datos local (esa configuracion esta en /config/development)

`NODE_ENV=production npm start` —> se conecta a la base de datos en la nube (esa configuracion esta en /config/production)
