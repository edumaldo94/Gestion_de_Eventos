//../models/eventoModel.js
const db = require('../config/db');

//1. Registro de Eventos: Agregar
const Evento = {
    crear: (datosEvento, callback) => {
        const sql = 'INSERT INTO evento (nombre, fecha, ubicacion, descripcion, imagen) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [datosEvento.nombre, datosEvento.fecha, datosEvento.ubicacion, datosEvento.descripcion, datosEvento.imagen], callback);
    },

//1. Registro de Eventos: Ver lista de Eventos
obtenerTodos: callback => {
    const sql = 'SELECT * FROM evento ORDER BY fecha DESC';
    db.query(sql, callback);
},
eventosQueAsisto: (idUsuario, callback) => {
    const sql = `
   SELECT 
    evento.idEvento, 
    evento.nombre, 
    evento.descripcion, 
    evento.ubicacion, 
    evento.fecha,
    evento.imagen,
    (SELECT COUNT(*) FROM participacion p WHERE p.idEvento = evento.idEvento) AS CantidadParticipantes,
    IFNULL(participacion.idUsuario, 0) AS estaRegistrado
FROM evento
LEFT JOIN participacion 
    ON evento.idEvento = participacion.idEvento 
    AND participacion.idUsuario = ?
ORDER BY 
    CASE 
        WHEN DATE(evento.fecha) = CURDATE() THEN 1    
        WHEN evento.fecha > CURDATE() THEN 2        
        ELSE 3                                       
    END,
    evento.fecha ASC
                                            
;

    `;
    db.query(sql, [idUsuario], callback);
},
//1. Registro de Eventos: Operación de Edición
    actualizar: (id, datosEvento, callback) => {
        const sql = 'UPDATE evento SET nombre = ?, fecha = ?, ubicacion = ?, descripcion = ?, imagen = ? WHERE idEvento = ?';
        db.query(sql, [datosEvento.nombre, datosEvento.fecha, datosEvento.ubicacion, datosEvento.descripcion,datosEvento.imagen || null, id], callback);
    },

//1. Registro de Eventos: Operación de Eliminación
    eliminar: (id, callback) => {
        const sql = 'DELETE FROM evento WHERE idEvento = ?';
        db.query(sql, [id], callback);
    },


//2. Visualización de Evento: Lista de Eventos ordenados por Fecha
obtenerEventosPorFecha: callback => {
    const sql = 'SELECT * FROM evento WHERE fecha >= CURDATE() ORDER BY fecha ASC';
    db.query(sql, callback);
},
//2. Visualización de Eventos: Detalles de un Evento
  obtenerPorId: (idEvento, callback) => {
    const sql = `
        SELECT 
            e.idEvento,
            e.nombre as nombre,
            e.descripcion as descripcion,
            e.ubicacion as ubicacion,
            e.fecha as fecha,
            e.imagen as imagen,
            (SELECT COUNT(*) FROM participacion p WHERE p.idEvento = e.idEvento) as cantidadParticipantes
        FROM 
            evento e 
        WHERE 
            e.idEvento = ?`;
    db.query(sql, [idEvento], callback);
}


};

module.exports = Evento;
