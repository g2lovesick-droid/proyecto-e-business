/**
 * ARCHIVO DE CONFIGURACIÓN DE BASE DE DATOS
 * Aquí definimos las credenciales para conectar MySQL.
 */

const dbOptions = {
    host: 'localhost',
    user: 'meta_user',        // Usuario que creamos
    password: 'lausus24',     // Contraseña
    port: 3306,
    database: 'meta_deportiva' // Base de datos
};

module.exports = dbOptions;