const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);

        conn.query('SELECT * FROM categorias', (err, rows) => {
            if (err) return res.send(err);

            // AQUÍ ESTÁ EL CAMBIO MAGISTRAL
            // En lugar de res.json(rows), hacemos render y pasamos los datos de la sesión
            res.render('index', {
                data: rows,
                login: req.session.loggedin, // ¿Está logueado? (True/False)
                name: req.session.name       // El nombre del usuario (Ej: Yahir)
            });
        });
    });
});

module.exports = router;