
//../controllers/participacionController.js
const Participacion = require('../models/participacionModel');

// Registrar participación en un evento
exports.registrarParticipacion = (req, res) => {
    const idUsuario = req.body.idUsuario;  // Cambiado a idUsuario
    const idEvento = req.body.idEvento;

    Participacion.registrar(idUsuario, idEvento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ message: "Participación registrada con éxito" });
        }
    });
};
exports.verificarParticipacion = (req, res) => {
    const idUsuario = req.user.idUsuario;  // El ID del usuario viene del middleware
    const { idEvento } = req.params;

    Participacion.verifiarRegistro(idUsuario, idEvento, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al verificar participación.' });
        }
        // Devuelve el estado de la participación como un objeto con 'asistiendo'
        res.json({ asistiendo: result });  // 'result' es true si el usuario está inscrito
    });
};

  exports.cancelarParticipacion = (req, res) => {
    const { idUsuario } = req.user; // Middleware extrae el usuario
    const { idEvento } = req.params;
  

    Participacion.cancelarParti(idUsuario, idEvento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ message: "Participación registrada" });
        }
    });
  }

// Confirmar asistencia a un evento
exports.confirmarAsistencia = (req, res) => {
    const idUsuario = req.params.idUsuario;
    const idEvento = req.params.idEvento;
    const confirmacion = req.body.confirmacion;  // Recibimos el valor de confirmación

    // Asegúrate de que 'confirmacion' sea 0 o 1 antes de hacer la actualización
    if (confirmacion !== 0 && confirmacion !== 1) {
        return res.status(400).json({ error: 'Confirmación inválida. Debe ser 0 o 1.' });
    }

    Participacion.confirmarAsistencia(idUsuario, idEvento, confirmacion, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).json({ message: 'Asistencia actualizada con éxito.' });
        }
    });
};




/*// Obtener asistentes confirmados para un evento
exports.obtenerAsistentesConfirmados = (req, res) => {
    const { idEvento } = req.params;

    Participacion.obtenerAsistentesConfirmados(idEvento, (err, participaciones) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(participaciones);
    });
};
*/

// Descargar certificados de asistentes confirmados con detalles
exports.obtenerAsistentesConfirmadosConDetalles = (req, res) => {
    const { idEvento } = req.params;

    Participacion.obtenerAsistentesConfirmadosConDetalles(idEvento, (err, participaciones) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(participaciones);
    });
};

// Obtener asistentes confirmados para un evento
exports.obtenerAsistentesConfirmados = (req, res) => {
    const { idEvento } = req.params;

    Participacion.obtenerAsistentesConfirmados(idEvento, (err, participaciones) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(participaciones);
    });
};


// Eliminar una participación
exports.eliminarParticipacion = (req, res) => {
    const idParticipacion = req.params.id;

    Participacion.eliminar(idParticipacion, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: "Participación eliminada con éxito" });
        }
    });
};

