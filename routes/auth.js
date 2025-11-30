const express = require('express');
const router = express.Router();

// Importamos el controlador que acabamos de crear
const authController = require('../controllers/authController');

// 1. Rutas para MOSTRAR los formularios (GET)
router.get('/login', authController.renderLogin);
router.get('/register', authController.renderRegister);

// 2. Rutas para RECIBIR los datos del formulario (POST)
router.post('/register', authController.register);
router.post('/login', authController.login);

// 3. Ruta para CERRAR sesión
router.get('/logout', authController.logout);

module.exports = router;