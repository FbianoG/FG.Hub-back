const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SECRET_KEY

async function verifyToken(req, res, next) { // validação do token

    const token = req.headers.authorization.split(' ')[1] // caso o token seja enviado pelo header
    if (!token) return res.status(401).json({ auth: false, message: 'É necessário fazer login para acessar esta página.' })
    try {
        const decoded = jwt.verify(token, secretKey) // caso o token seja válido, ele é decodificado - se não cai no CATCH
        req.userId = decoded.id // crio "tipo uma variáve" que é enviado no "next()" para ser consultada no controllers
        next()
    } catch (error) {
        return res.status(401).json({ auth: false, message: 'Sessão expirada. Faça login novamente.' })
    }
}

async function createToken(id) { // cria o token
    const token = await jwt.sign({ id }, secretKey, { expiresIn: "4h" }) //{id: "valor a ser criptografado"}, chave secreta, { expiresIn: 1h, 10m 30s}
    return token
}


module.exports = { createToken, verifyToken }