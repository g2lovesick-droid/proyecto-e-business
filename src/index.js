const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql2'); // Asegúrate que sea mysql2
const myConnection = require('express-myconnection');
const session = require('express-session'); // <--- NUEVO: Importar sesiones

const app = express();

// --- Importar Rutas ---
const categoriasRoutes = require('./routes/categorias');
const authRoutes = require('./routes/auth'); // <--- NUEVO: Importar rutas de login

// --- Configuración ---
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Middlewares (Funciones intermedias) ---
app.use(morgan('dev'));

// 1. Configuración de Base de Datos
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'meta_user',
    password: 'lausus24',
    port: 3306,
    database: 'meta_deportiva'
}, 'single'));

// 2. Configuración de Sesión (MEMORIA DEL SERVIDOR) <--- NUEVO Y VITAL
app.use(session({
    secret: 'secret_meta_deportiva_key', // Clave secreta para firmar las cookies
    resave: false,
    saveUninitialized: false
}));

// 3. Entender datos de formularios (POST) <--- NUEVO Y VITAL
app.use(express.urlencoded({extended: false}));

// --- Rutas ---
app.use('/', categoriasRoutes);
app.use('/', authRoutes); // <--- NUEVO: Usar las rutas de login

// --- Iniciar Servidor ---
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});