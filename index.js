const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql2');
const myConnection = require('express-myconnection');
const session = require('express-session');

const app = express();

// --- IMPORTAR CONFIGURACIÓN (Punto 3 del profe) ---
const dbOptions = require('./config/db'); // Importamos las credenciales desde config

// --- IMPORTAR RUTAS ---
const categoriasRoutes = require('./routes/categorias');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const productosRoutes = require('./routes/productos');

// --- SETTINGS ---
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
// Como movimos la carpeta views a la raíz, ajustamos la ruta:
app.set('views', path.join(__dirname, 'views'));

// --- MIDDLEWARES ---
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Configuración de Sesión
app.use(session({
    secret: 'secret_meta_deportiva_key',
    resave: false,
    saveUninitialized: false
}));

// Conexión a Base de Datos (Usando la config importada)
app.use(myConnection(mysql, dbOptions, 'single'));

// Archivos Estáticos (CSS, Imágenes) - Carpeta public en la raíz
app.use(express.static(path.join(__dirname, 'public')));

// --- RUTAS ---
app.use('/', categoriasRoutes);
app.use('/', authRoutes);
app.use('/', adminRoutes)
app.use('/', productosRoutes);

// --- INICIAR SERVIDOR ---
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});