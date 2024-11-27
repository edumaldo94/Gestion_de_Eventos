const express = require('express');
const router = express.Router();
const participacionController = require('../controllers/participacionController');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/p-registro', authMiddleware([1,2]),participacionController.registrarParticipacion);//ok
router.get('/p-certificadopdf/:idEvento/detalles',authMiddleware([1]), participacionController.obtenerAsistentesConfirmadosConDetalles);
router.get('/p-confirmados/:idEvento',authMiddleware([1]), participacionController.obtenerAsistentesConfirmados);//ok
router.put('/p-asistencia/:idUsuario/:idEvento',authMiddleware([1]), participacionController.confirmarAsistencia);//ok
router.delete('/p-delet/:id',authMiddleware([1]), participacionController.eliminarParticipacion);//ok
router.get('/verificar/:idEvento', authMiddleware([1,2]),participacionController.verificarParticipacion);//ok
router.delete('/p-cancelar/:idEvento', authMiddleware([1,2]),participacionController.cancelarParticipacion);//ok
module.exports = router;