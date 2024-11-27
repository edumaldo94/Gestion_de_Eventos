const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer'); // Importar el middleware multer

/*

// Proteger las rutas con authMiddleware
router.post('/crear', authMiddleware(), eventoController.crearEvento);
router.get('/futuros', authMiddleware, eventoController.obtenerEventosFuturos);
*/

router.post('/eve-crear',upload.single('imagen'),authMiddleware([1]), eventoController.crearEvento); //Status: 200 OK //ok
router.get('/eve-todos',authMiddleware([1,2]), eventoController.obtenerEventos);//Status: 200 OK //ok
router.get('/eve-detalle/:idEvento',authMiddleware([1,2]),  eventoController.obtenerEventoPorId);//Status: 200 OK //ok
//Hacer Actualizar Evento Mañana 25 lunes
router.put('/eve-actualizar/:id',upload.single('imagen'),authMiddleware([1]), eventoController.actualizarEvento);//Status: 200 OK
router.delete('/eve-borrar/:id',authMiddleware([1]), eventoController.eliminarEvento);//Status: 200 OK //ok
router.get('/eve-porFecha',authMiddleware([1,2]),  eventoController.obtenerEventosFuturos);//Status: 200 OK
router.get('/eve-queasisto/:idUsuario',authMiddleware([1,2]),  eventoController.obtenerEventosQueAsisto);//Status: 200 OK//ok
router.get('/certificado/:idUsuario/:idEvento', authMiddleware([1]), eventoController.generarCertificado);
//authMiddleware([1])= organizador
//authMiddleware([2])= asistente
//authMiddleware()= para cualquier usuario authorizado


module.exports = router;