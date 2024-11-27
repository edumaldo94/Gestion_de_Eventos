
//../controllers/eventoController.js
const Evento = require('../models/eventoModel');
const pdfMake = require('pdfmake');
const path = require('path');
const Usuario = require('../models/usuarioModel');
const { format } = require('date-fns');
const { es } = require('date-fns/locale'); 
const multer = require('multer');




// Crear un nuevo evento
exports.crearEvento = (req, res) => {
    const datosEvento = {
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        ubicacion: req.body.ubicacion,
        descripcion: req.body.descripcion,
        imagen: req.file ? `/uploads/${req.file.filename}` : nu // Guardar la ruta del archivo
    };
console.log(datosEvento.imagen)
    Evento.crear(datosEvento, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error al crear evento", error: err });
        }
        res.status(201).json({ message: "Evento creado con éxito", evento: result });
    });
};

// Obtener todos los eventos
exports.obtenerEventos = (req, res) => {
    Evento.obtenerTodos((err, eventos) => {
       
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(eventos);
        }
    });
};
exports.obtenerEventosQueAsisto = (req, res) => {
    const idUsuario = req.params.idUsuario;

    Evento.eventosQueAsisto(idUsuario, (err, eventos) => {
        if (err) {
            return res.status(500).send({ message: 'Error al obtener eventos', error: err });
        }

        res.status(200).json(eventos);
    });
};

// Obtener un evento por ID
exports.obtenerEventoPorId = (req, res) => {
    const idEvento = req.params.idEvento;
    Evento.obtenerPorId(idEvento, (err, evento) => {
      
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(evento);
        }
    });
};

// Actualizar un evento
exports.actualizarEvento = (req, res) => {
    const idEvento = req.params.id;

    // Construir la ruta de la imagen: nueva imagen o la existente

    const datosEvento = {
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        ubicacion: req.body.ubicacion,
        descripcion: req.body.descripcion,
        imagen: req.file ? `/uploads/${req.file.filename}` : req.body.imagenActual
    };

    // Actualizar en la base de datos
    Evento.actualizar(idEvento, datosEvento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: "Evento actualizado con éxito" });
        }
    });
};

exports.obtenerEventosFuturos = (req, res) => {
    Evento.obtenerEventosPorFecha((err, eventos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(eventos);
    });
};

// Eliminar un evento
exports.eliminarEvento = (req, res) => {
    const idEvento = req.params.id;
    Evento.eliminar(idEvento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: "Evento eliminado con éxito" });
        }
    });
};



exports.generarCertificado = (req, res) => {
    const { idUsuario, idEvento } = req.params;
    console.log("Generando certificado para:", idUsuario, idEvento);

    // Obtener los datos del usuario desde la base de datos
    Usuario.obtenerUsuario(idUsuario, (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (usuario.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Obtener los datos del evento desde la base de datos
        Evento.obtenerPorId(idEvento, (err, evento) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener datos del evento', error: err });
            }
            if (!evento || evento.length === 0) {
                return res.status(404).json({ message: 'Evento no encontrado' });
            }
        
            const eventoData = evento[0];
            const fechaFormateada = format(new Date(eventoData.fecha), "d 'de' MMMM 'de' yyyy", { locale: es });
        
            const datosUsuario = {
                nombre: usuario[0].nombre,  
                evento: eventoData.nombre,  
                fecha: fechaFormateada,    
            };
            // Configuración de fuentes
            const fonts = {
                Roboto: {
                    normal: path.join(__dirname, '..', 'public', 'fonts', 'Roboto-Regular.ttf'),
                    bold: path.join(__dirname, '..', 'public', 'fonts', 'Roboto-Bold.ttf'),
                },
                MeaCulpa: {
                    normal: path.join(__dirname, '..', 'public', 'fonts', 'MeaCulpa-Regular.ttf'),
                },
            };

            const printer = new pdfMake(fonts);

            // Definición del contenido del PDF
            const docDefinition = {
                pageMargins: [50, 50, 50, 50], // Márgenes equilibrados
                background: () => ({
                    canvas: [
                        { type: 'rect', x: 0, y: 0, w: 595, h: 842, r: 10, lineWidth: 2, lineColor: '#000000' }, // Marco simple
                    ],
                }),
                content: [
                    '\n\n', // Espaciado inicial
                    { text: 'Certificado de Participación', style: 'header', alignment: 'center' },
                    '\n\n',
                    { text: `Este certificado se otorga a`, style: 'subheader', alignment: 'center' },
                    { text: datosUsuario.nombre, style: 'italicName', alignment: 'center', italic: true }, // Nombre en cursiva
                    '\n',
                    { text: `Por su participación destacada en el evento`, style: 'subheader', alignment: 'center' },
                    { text: datosUsuario.evento, style: 'eventName', alignment: 'center' },
                    '\n\n',
                    { text: `Fecha del Evento: ${datosUsuario.fecha}`, style: 'normal', alignment: 'center' },
                    '\n\n\n',
                    { text: 'Gracias por su participación.', style: 'footer', alignment: 'center' },
                    '\n\n',
              
                    {
                        columns: [
                            { text: 'Director del Evento', style: 'signatureTitle', alignment: 'center', width: '50%' },
                            { text: '' }, // Espacio para alineación
                        ],
                    },
                    {
                        columns: [
                            { text: 'Juan Pérez', style: 'signature',fontSize: 30,font: 'MeaCulpa', alignment: 'center', width: '50%' },
                            { text: '' }, // Espacio para alineación
                        ],
                    },
                ],
                styles: {
                    header: { fontSize: 30, bold: true, color: '#2E3A59' },
                    subheader: { fontSize: 18, margin: [0, 10, 0, 10], color: '#555' },
                    italicName: { fontSize: 35,font: 'MeaCulpa',  italic: true, color: '#000' },
                    eventName: { fontSize: 30,font: 'MeaCulpa', color: '#007BFF'},
                    normal: { fontSize: 16 },
                    footer: { fontSize: 12, italic: true, color: '#777' },
                    signatureLine: { fontSize: 14, margin: [0, 20, 0, 5], color: '#000' },
                    signatureTitle: { fontSize: 12, bold: true, margin: [0, 0, 0, 5], color: '#555' },
                    signature: { fontSize: 14, italic: true, color: '#555' }, // Firma en cursiva
                },
            };
            
            const pdfDoc = printer.createPdfKitDocument(docDefinition);

            // Configurar encabezados y enviar el PDF como respuesta
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=certificado_${datosUsuario.nombre}_${idEvento}.pdf`);
            pdfDoc.pipe(res);
            pdfDoc.end();
        });
    });
};

