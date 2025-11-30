const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
const authController = require('../controllers/authController');

// --- RUTAS PROTEGIDAS PARA PRODUCTOS ---

// Ver la tabla (Read)
router.get('/admin/productos', authController.checkAdmin, productoController.list);

// Ver el formulario de Agregar (Create - GET) <--- ESTA FALTABA
router.get('/admin/productos/add', authController.checkAdmin, productoController.renderAdd);

// Guardar el producto nuevo (Create - POST)
router.post('/admin/productos/add', authController.checkAdmin, productoController.save);

// Eliminar (Delete)
router.get('/admin/productos/delete/:id', authController.checkAdmin, productoController.remove);

// Ver formulario de edición (GET)
router.get('/admin/productos/edit/:id', authController.checkAdmin, productoController.edit);

// Guardar los cambios (POST)
router.post('/admin/productos/update/:id', authController.checkAdmin, productoController.update);

module.exports = router;