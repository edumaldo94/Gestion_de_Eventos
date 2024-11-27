//./Backend/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariocontroller');
const authMiddleware = require('../middleware/authMiddleware');
// Registrar un usuario
router.post('/registrar', usuarioController.registrarUsuario);

// Iniciar sesión
router.post('/login', usuarioController.login);

// Obtener el rol de un usuario
router.get('/rol/:idUsuario', usuarioController.obtenerRol);
router.post('/logout', usuarioController.logout);
router.put('/update/:idUsuario',authMiddleware([1,2]), usuarioController.actualizarUsuario);
router.get('/obteneruser/:idUsuario',authMiddleware([1,2]), usuarioController.obtenerUsuario);
router.put('/update-password/:idUsuario',authMiddleware([1,2]), usuarioController.cambiarContrasena);

module.exports = router;