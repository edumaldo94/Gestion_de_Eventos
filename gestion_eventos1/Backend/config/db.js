const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion_eventos1'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos de eventos');
});

module.exports = db;
