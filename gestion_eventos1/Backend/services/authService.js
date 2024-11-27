// /services/authService.js

const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration } = require('../config/jwt'); // Importar clave secreta y expiración

const generateToken = (user) => {
    console.log("Token generado:", user);
    return jwt.sign(  { idUsuario: user.idUsuario, idRol: user.idRol }, jwtSecret, { expiresIn: jwtExpiration });
};
const verifyToken = (token) => {
    try {
        console.log("Verificando token:", token); // Log del token

        // Si el token viene con el prefijo 'Bearer ', debes quitarlo
        const tokenSinBearer = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

        // Verificamos el token
        const decoded = jwt.verify(tokenSinBearer, jwtSecret);
        console.log("Token verificado:", decoded); // Log de los datos del token verificado
        
        return decoded;
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.log("El token ha expirado:", err.message);
            return { error: 'Token expirado' };
        }
        console.log("Error al verificar el token:", err.message);
        return { error: 'Token inválido' }; // Otro tipo de error
    }
};
module.exports = {
    generateToken,
    verifyToken
};
/*const gdsdenerateToken = (user) => {
    return jwt.sign(
      { idUsuario: user.idUsuario, idRol: user.idRol },
      SECRET_KEY,
      { expiresIn: '1h' }  // Opcional: Define el tiempo de expiración
    );
};*/

/*
const verifyToken = (token) => {
    try {
        console.log("Verificando token:", token); // Log del token
        return jwt.verify(token, jwtSecret);
    } catch (err) {
        console.log("Error al verificar el token:", err); // Log del error
        return null;  // Si el token es inválido o ha expirado
    }
};
*/

