const express = require('express');
const router = express.Router();

// Importamos el controlador de Auth para usar el 'checkAdmin'
const authController = require('../controllers/authController');

// RUTA PRINCIPAL DEL PANEL (/admin)
// Usamos 'authController.checkAdmin' como barrera antes de la función
router.get('/admin', authController.checkAdmin, (req, res) => {
    res.render('admin/dashboard', {
        name: req.session.name // Pasamos el nombre para que diga "Hola Dueño"
    });
});

module.exports = router;