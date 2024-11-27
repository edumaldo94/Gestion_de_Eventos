// ../controllers/usuarioController.js
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const blacklistedTokens = new Set(); // Lista negra de tokens

// Registrar un nuevo usuario
const { hashPassword, verifyPassword } = require('../services/passwordService');

const { generateToken } = require('../services/authService');
exports.registrarUsuario = async (req, res) => {
    const { nombre, email, password, idRol } = req.body;

    // Verifica que el campo 'password' sea una cadena válida
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: 'La contraseña es inválida o no está presente' });
    }

    try {
        // Verificar si el usuario ya existe
        Usuario.obtenerPorEmail(email, async (err, usuarioExistente) => {
            if (usuarioExistente.length > 0) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            // Hashear la contraseña
            const hashedPassword = await hashPassword(password);

            // Crear el usuario
            const nuevoUsuario = {
                nombre,
                email,
                password: hashedPassword,
                idRol
            };

            Usuario.crear(nuevoUsuario, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'Usuario registrado con éxito', id: result.insertId });
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Iniciar sesión (Autenticación)
exports.login = (req, res) => {
    const { email, password } = req.body;

    Usuario.obtenerPorEmail(email, async (err, usuario) => {
        if (err || usuario.length === 0) {
            console.log("Usuario no encontrado o error:", err);
            return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        

        // Verificar la contraseña
        const validPassword = await verifyPassword(password, usuario[0].password);  // Asegúrate de acceder a usuario[0].password
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
       // Generar el token JWT
       const token = generateToken(usuario[0]);

       // Enviar el token y el rol en la respuesta
       res.status(200).json({ token, rol: usuario[0].idRol,  idUsuario: usuario[0].idUsuario  });
    });
};
// Cerrar sesión (Logout)
exports.logout = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token no proporcionado.' });
    }

    // Agregar el token a la lista negra
    blacklistedTokens.add(token);
    res.status(200).json({ message: 'Sesión cerrada correctamente.' });
};
// Obtener el rol de un usuario
exports.obtenerRol = (req, res) => {
    const { idUsuario } = req.params;

    Usuario.obtenerRolPorId(idUsuario, (err, rol) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rol);
    });
};
exports.actualizarUsuario = (req, res) => {
    const { idUsuario } = req.params;  // Obtener el idUsuario de la URL
    const { nombre, email } = req.body; // Obtener los datos del cuerpo de la solicitud

    // Verifica si los datos son correctos
    if (!nombre || !email) {
        return res.status(400).json({ message: 'Nombre y email son requeridos' });
    }

    // Llama a la función de actualización
    Usuario.actualizar(idUsuario, { nombre, email }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    });
};


exports.obtenerUsuario = (req, res) => {
    const { idUsuario } = req.params;

    Usuario.obtenerUsuario(idUsuario, (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario[0]); // Retorna solo el primer usuario encontrado
    });
};
    exports.cambiarContrasena = (req, res) => {
        const { idUsuario } = req.params;
        const { nuevaContrasena } = req.body;
    
        // Hashear la nueva contraseña
        bcrypt.hash(nuevaContrasena, saltRounds, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ error: 'Error al hashear la contraseña' });
            }
    
            // Llamar a la función del modelo para actualizar la contraseña
            Usuario.actualizarContrasena(idUsuario, hashedPassword, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar la contraseña' });
                }
                res.status(200).json({ message: 'Contraseña actualizada correctamente' });
            });
        });
    };
