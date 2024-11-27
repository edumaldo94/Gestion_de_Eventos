const express = require('express');
const router = express.Router();

const asistenteRouter = require('./asistenteRoutes');
const eventoRouter = require('./eventoRoutes');
const participacionRouter = require('./participacionRoutes');
const usuarioRoutes = require('./usuarioRoutes');

router.use('/asistente',asistenteRouter);
router.use('/evento',eventoRouter);
router.use('/participacion',participacionRouter);
router.use('/usuarios', usuarioRoutes);


module.exports = router;