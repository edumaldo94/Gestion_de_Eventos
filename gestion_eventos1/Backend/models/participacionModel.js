//../models/participacionModel.js

const db = require('../config/db');

const Participacion = {
// Registrar la participación de un usuario en un evento
registrar: (idUsuario, idEvento, callback) => {
    // Primero verificamos si el evento es futuro o no
    const sqlFechaEvento = 'SELECT fecha FROM evento WHERE idEvento = ?';
    db.query(sqlFechaEvento, [idEvento], (err, result) => {
        if (err) {
            return callback(err, null);
        }

        if (result.length === 0) {
            return callback(new Error("Evento no encontrado"), null);
        }

        const fechaEvento = new Date(result[0].fecha);
        const fechaActual = new Date();

      
        // Comparar solo las fechas (sin tiempo)
        const soloFechaEvento = new Date(fechaEvento.getFullYear(), fechaEvento.getMonth(), fechaEvento.getDate());
        const soloFechaActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());

        if (soloFechaEvento < soloFechaActual) {
            return callback(new Error("El evento ya ha pasado. No puedes registrarte."), null);
        }

        // Si la fecha es válida, procedemos con el registro
        const sql = 'INSERT INTO participacion (idUsuario, idEvento, confirmacion) VALUES (?, ?, 0)';
        db.query(sql, [idUsuario, idEvento], callback);
    });
},

verifiarRegistro: (idUsuario, idEvento, callback) => {
    const sql = 'SELECT COUNT(*) AS count FROM participacion WHERE idUsuario = ? AND idEvento = ?';
    db.query(sql, [idUsuario, idEvento], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result[0].count > 0);
    });
},

cancelarParti: (idUsuario, idEvento, callback) => {
    const sql = 'DELETE FROM participacion WHERE idUsuario = ? AND idEvento = ?';
    db.query(sql, [idUsuario, idEvento], callback);
},


// Confirmar la asistencia de un usuario
confirmarAsistencia: (idUsuario, idEvento, confirmacion, callback) => {
    const sql = 'UPDATE participacion SET confirmacion = ? WHERE idUsuario = ? AND idEvento = ?';
    db.query(sql, [confirmacion, idUsuario, idEvento], callback);
},

// Obtener asistentes confirmados con detalles (nombre, email, evento)
    obtenerAsistentesConfirmadosConDetalles: (idEvento, callback) => {
        const sql = `
            SELECT u.nombre, u.email, e.nombre AS evento, e.fecha
            FROM usuarios u
            JOIN participacion p ON u.idUsuario = p.idUsuario
            JOIN evento e ON p.idEvento = e.idEvento
            WHERE p.confirmacion = 1 AND p.idEvento = ?`;
        db.query(sql, [idEvento], callback);
    },

// Obtener lista de asistentes confirmados
obtenerAsistentesConfirmados: (idEvento, callback) => {
    const sql = `
        SELECT 
        u.idUsuario,
            u.nombre, 
            u.email, 
            p.confirmacion ,
            p.idParticipacion
        FROM usuarios u
        JOIN participacion p ON u.idUsuario = p.idUsuario
        WHERE p.idEvento = ? AND (p.confirmacion = 1 OR p.confirmacion = 0)`;
    db.query(sql, [idEvento], callback);
},


// Eliminar una participación
    eliminar: (idParticipacion, callback) => {
        const sql = 'DELETE FROM participacion WHERE idParticipacion = ?';
        db.query(sql, [idParticipacion], callback);
    }
};

module.exports = Participacion;






/*const db = require('../config/db');

const Participacion = {
//2 Registro de Asistentes:Registrar la participación de un usuario en un evento Status: 200 OK
    registrar: (idAsistente, idEvento, callback) => {
        const sql = 'INSERT INTO participacion (idAsistente, idEvento, confirmacion) VALUES (?, ?, 0)';
        db.query(sql, [idAsistente, idEvento], callback);
    },
//2 Confirmación de Participación:Confirmar la asistencia de un usuario Status: 200 OK
    confirmarAsistencia: (idAsistente, idEvento, callback) => {
        //const sql = 'UPDATE participacion SET confirmacion = 1 WHERE idParticipacion = ?';
        const sql = 'UPDATE participacion SET confirmacion = 1 WHERE idAsistente = ? AND idEvento = ?;';
        db.query(sql, [idAsistente, idEvento], callback);
    },

    //5 Descarga de Certificados Status: 200 OK
    obtenerAsistentesConfirmadosConDetalles: (idEvento, callback) => {
        const sql = `
            SELECT a.nombre, a.email, e.nombre AS evento, e.fecha
            FROM asistente a
            JOIN participacion p ON a.idAsistente = p.idAsistente
            JOIN evento e ON p.idEvento = e.idEvento
            WHERE p.confirmacion = 1 AND p.idEvento = ?`;
        db.query(sql, [idEvento], callback);
    },

    //2 Confirmación de Participación:Ver lista de participantes confirmados para un evento Status: 200 OK
    obtenerAsistentesConfirmados: (idEvento, callback) => {
        const sql = `
            SELECT a.nombre, a.email
            FROM asistente a
            JOIN participacion p ON a.idAsistente = p.idAsistente
            WHERE p.idEvento = ? AND p.confirmacion = 1`;
        db.query(sql, [idEvento], callback);
    },

    //Status: 200 OK
    eliminar: (idParticipacion, callback) => {
        const sql = 'DELETE FROM participacion WHERE idParticipacion = ?';
        db.query(sql, [idParticipacion], callback);
    },
    
};

module.exports = Participacion;
*/


    /*
   //2 Confirmación de Participación:Ver lista de participantes confirmados para un evento Status: 200 OK
   participantesConfirmados: (idEvento, callback) => {
    const sql = 'SELECT a.nombre, a.email FROM asistente a JOIN participacion p ON a.idAsistente = p.idAsistente WHERE p.idEvento = ? AND p.confirmacion = 1;';
    db.query(sql, [idEvento], callback);
},
*/
   