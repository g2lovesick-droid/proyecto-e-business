const bcrypt = require('bcryptjs');

// 1. Mostrar el formulario de Registro
function renderRegister(req, res) {
    // Si ya está logueado, lo mandamos al inicio
    if (req.session.loggedin) {
        return res.redirect('/');
    }
    res.render('auth/register');
}

// 2. Mostrar el formulario de Login
function renderLogin(req, res) {
    if (req.session.loggedin) {
        return res.redirect('/');
    }
    res.render('auth/login');
}

// 3. REGISTRAR USUARIO (La magia de la encriptación)
function register(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        // Buscamos si el correo ya existe
        conn.query('SELECT * FROM usuarios WHERE email = ?', [data.email], (err, rows) => {
            if (rows.length > 0) {
                return res.send('Error: El correo ya está registrado.'); 
            } else {
                // ENCRIPTAR CONTRASEÑA
                // '12' es el nivel de fuerza (salt). Más alto = más seguro pero más lento.
                bcrypt.hash(data.password, 12).then(hash => {
                    data.password = hash; // Reemplazamos '12345' por el garabato encriptado
                    
                    data.rol = 'cliente'; // Por defecto todos son clientes

                    conn.query('INSERT INTO usuarios SET ?', [data], (err, rows) => {
                        // Una vez registrado, lo mandamos al login
                        res.redirect('/login');
                    });
                });
            }
        });
    });
}

// 4. INICIAR SESIÓN (Validar encriptación)
function login(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE email = ?', [data.email], (err, rows) => {
            if (rows.length > 0) {
                const usuario = rows[0];

                // COMPARAR: Contraseña escrita vs Contraseña encriptada en BDD
                bcrypt.compare(data.password, usuario.password, (err, esCorrecta) => {
                    if (esCorrecta) {
                        // ¡Éxito! Creamos la sesión
                        req.session.loggedin = true;
                        req.session.name = usuario.nombre_completo;
                        req.session.rol = usuario.rol; // Guardamos si es admin o cliente

                        res.redirect('/'); // Mandar al inicio
                    } else {
                        res.send('Error: Contraseña incorrecta');
                    }
                });
            } else {
                res.send('Error: El usuario no existe');
            }
        });
    });
}

// 5. CERRAR SESIÓN
function logout(req, res) {
    if (req.session.loggedin) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
}

//Proteger rutas de Admin

function checkAdmin(req, res, next) {
    // 1. Verificamos si hay sesión iniciada
    if (req.session.loggedin) {
        // 2. Verificamos si el rol es 'admin'
        if (req.session.rol === 'admin') {
            next(); // ¡Pase usted, jefe! Continúa a la siguiente ruta.
        } else {
            // Si es cliente, lo mandamos al inicio con un mensaje (opcional)
            res.redirect('/'); 
        }
    } else {
        // Si ni siquiera está logueado, al login
        res.redirect('/login');
    }
}


module.exports = {
    renderRegister,
    renderLogin,
    register,
    login,
    logout,
    checkAdmin
};