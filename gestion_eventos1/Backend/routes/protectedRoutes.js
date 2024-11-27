const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware'); // Importa el middleware de autenticación

// Ruta protegida básica
router.get('/secure', authMiddleware(), (req, res) => {
    res.json({ message: 'Acceso autorizado a rutas protegidas', user: req.user });
});

// Ruta protegida con rol específico
router.get('/admin', authMiddleware(['admin']), (req, res) => {
    res.json({ message: 'Acceso autorizado para administradores' });
});

// Otra ruta protegida de ejemplo
router.get('/user-profile', authMiddleware(), (req, res) => {
    res.json({ message: 'Acceso autorizado al perfil del usuario', user: req.user });
});

module.exports = router;
