// /services/passwordService.js

const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;  // true si coinciden, false si no
};

module.exports = {
    hashPassword,
    verifyPassword
};
