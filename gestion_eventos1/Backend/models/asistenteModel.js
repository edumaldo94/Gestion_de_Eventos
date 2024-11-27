const db = require('../config/db');

const Asistente = {
// Crear un nuevo asistente (Usuario con rol de Asistente)
    crear: (datosUsuario, callback) => {
        const sql = 'INSERT INTO usuarios (nombre, email, password, idRol) VALUES (?, ?, ?, ?)';
        db.query(sql, [datosUsuario.nombre, datosUsuario.email, datosUsuario.password, 2], callback); // idRol 2 es para Asistentes
    },

// Obtener todos los asistentes
    obtenerTodos: callback => {
        const sql = 'SELECT u.nombre, u.email, a.domicilio FROM usuarios u JOIN asistente a ON u.idUsuario = a.idAsistente';
        db.query(sql, callback);
    },

// Obtener un asistente por su ID
    obtenerPorId: (id, callback) => {
        const sql = 'SELECT u.nombre, u.email, a.domicilio FROM usuarios u JOIN asistente a ON u.idUsuario = a.idAsistente WHERE u.idUsuario = ?';
        db.query(sql, [id], callback);
    },

// Actualizar los datos de un asistente
    actualizar: (id, datosUsuario, callback) => {
        const sql = `
            UPDATE usuarios u
            JOIN asistente a ON u.idUsuario = a.idAsistente
            SET u.nombre = ?, u.email = ?, a.domicilio = ?
            WHERE u.idUsuario = ?`;
        db.query(sql, [datosUsuario.nombre, datosUsuario.email, datosUsuario.domicilio, id], callback);
    },

// Eliminar un asistente
    eliminar: (id, callback) => {
        const sql = 'DELETE FROM usuarios WHERE idUsuario = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Asistente;
