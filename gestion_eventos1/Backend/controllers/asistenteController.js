//../controllers/asistenteController.js
const Asistente = require('../models/asistenteModel');
const Usuario = require('../models/usuarioModel');

// Registrar un asistente (usuario con rol de asistente)
exports.crearAsistente = (req, res) => {
    const datosUsuario = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        idRol: 2  // Rol de asistente
    };

    Usuario.crear(datosUsuario, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Asistente registrado con éxito', id: result.insertId });
    });
};

exports.obtenerAsistentes = (req, res) => {
    Asistente.obtenerTodos((err, asistentes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(asistentes);
    });
};

exports.obtenerAsistentePorId = (req, res) => {
    const { id } = req.params;
    Asistente.obtenerPorId(id, (err, asistente) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(asistente);
    });
};

exports.actualizarAsistente = (req, res) => {
    const { id } = req.params;
    const datosAsistente = req.body;
    Asistente.actualizar(id, datosAsistente, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Asistente actualizado' });
    });
};

exports.eliminarAsistente = (req, res) => {
    const { id } = req.params;
    Asistente.eliminar(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Asistente eliminado' });
    });
};
