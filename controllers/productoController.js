const controller = {};

// 1. LISTAR
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        // AGREGAMOS 'ORDER BY p.id ASC' AL FINAL DE LA CONSULTA
        const query = `
            SELECT p.*, c.nombre as categoria_nombre 
            FROM productos p 
            JOIN categorias c ON p.categoria_id = c.id
            ORDER BY p.id ASC
        `;

        conn.query(query, (err, rows) => {
            if (err) return res.json(err);
            res.render('admin/productos', {
                data: rows,
                name: req.session.name
            });
        });
    });
};

// 2. MOSTRAR FORMULARIO DE AGREGAR
// Necesitamos pedir las categorías para llenar la lista desplegable
controller.renderAdd = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM categorias', (err, categories) => {
            if (err) return res.json(err);
            
            res.render('admin/productos_add', {
                categories: categories, // Pasamos las categorías a la vista
                name: req.session.name
            });
        });
    });
};

// 3. GUARDAR EL PRODUCTO
controller.save = (req, res) => {
    const data = req.body; // Los datos del formulario

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO productos SET ?', [data], (err, rows) => {
            if (err) return res.json(err);
            
            res.redirect('/admin/productos'); // Volver a la tabla
        });
    });
};

// 4. ELIMINAR
controller.remove = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM productos WHERE id = ?', [id], (err, rows) => {
            if (err) return res.json(err);
            res.redirect('/admin/productos');
        });
    });
};

// 5. MOSTRAR FORMULARIO DE EDICIÓN (Read one + Categories)
controller.edit = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        // Consultamos el producto específico Y todas las categorías (para el select)
        conn.query('SELECT * FROM productos WHERE id = ?', [id], (err, products) => {
            conn.query('SELECT * FROM categorias', (err, categories) => {
                if (err) return res.json(err);

                res.render('admin/productos_edit', {
                    data: products[0], // Enviamos solo el primer resultado (el producto encontrado)
                    categories: categories,
                    name: req.session.name
                });
            });
        });
    });
};

// 6. ACTUALIZAR LOS DATOS (Update)
controller.update = (req, res) => {
    const { id } = req.params;
    const newProduct = req.body; // Los datos nuevos del formulario

    req.getConnection((err, conn) => {
        conn.query('UPDATE productos SET ? WHERE id = ?', [newProduct, id], (err, rows) => {
            if (err) return res.json(err);
            
            res.redirect('/admin/productos');
        });
    });
};

module.exports = controller;