const express = require('express');
const router = express.Router();
const asistentesController = require('../controllers/asistenteController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/a',authMiddleware([1]), asistentesController.obtenerAsistentes); //Status: 200 OK
router.post('/a-crear',authMiddleware(), asistentesController.crearAsistente); //Status: 200 OK
router.get('/a-obtener/:id',authMiddleware([1]), asistentesController.obtenerAsistentePorId); //Status: 200 OK
router.put('/a-actualizar/:id',authMiddleware(), asistentesController.actualizarAsistente); //Status: 200 OK
router.delete('/a-delet/:id',authMiddleware([1]), asistentesController.eliminarAsistente); //Status: 200 OK
module.exports = router;

