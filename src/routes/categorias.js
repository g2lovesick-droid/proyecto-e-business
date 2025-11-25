const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            // Error de conexión (contraseña, etc.)
            return res.status(500).json({ error: 'Error de Conexión', detalle: err.message });
        }
        conn.query('SELECT * FROM categorias', (err, rows) => {
            if (err) {
                // Error en la consulta (tabla no existe, etc.)
                return res.status(500).json({ error: 'Error de Consulta', detalle: err.message });
            }
            // Si todo sale bien, envía las filas
            res.json(rows);
        });
    });
});
module.exports = router;