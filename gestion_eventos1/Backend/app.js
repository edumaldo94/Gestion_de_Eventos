const express = require('express');
const conexion = require('./config/db');
const app= express();
const port=3000;
const bodyParser = require('body-parser');
const router = require('./routes/index');
const cors = require('cors');
const path = require('path');
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'uploads'
app.use(bodyParser.json({ limit: '10mb' })); // Límite de 10 MB para JSON
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Si también aceptas datos de formularios URL-encoded:
app.use(express.urlencoded({ extended: true }));
app.use('/',router)

app.get('/', (req, res) => {
res.send('Aguante River');
});

app.listen(port,() => {

    console.log(`Servidor escuchando en http://localhost:${port}`);
});