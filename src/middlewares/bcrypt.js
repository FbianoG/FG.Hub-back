const bcrypt = require('bcrypt');
const saltRounds = 10; // Defina o número de rounds de iteração para gerar o salt



async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
}

// Exemplo de função para verificar uma senha
async function comparePassword(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword); // compara a senha (senhaDigitada, senhaNoDataBase)
        return match;
    } catch (error) {
        throw error;
    }
}

module.exports = { hashPassword, comparePassword }
