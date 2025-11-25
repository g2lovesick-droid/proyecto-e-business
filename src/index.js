const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql2');
const myConnection = require('express-myconnection');

const app = express();

//importar rutas

const categoriasRoutes = require('./routes/categorias.js');

//configuración del servidor -settings

app.set('port', process.env.PORT ||3000);
app.set('view engine', 'ejs');
app.set("views",path.join(__dirname, 'views'));

//Middleswares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'meta_user',        
    password: 'lausus24',
    port: 3306,
    database: 'meta_deportiva' 
}, 'single'));

app.use('/', categoriasRoutes);
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});