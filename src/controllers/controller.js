const { Planos, Docs, Ramais, Sites, User, Doctor } = require("../models/model")
const jwt = require('../middlewares/jwt')
const { hashPassword, comparePassword } = require('../middlewares/bcrypt')
require('dotenv').config()

// Users controls
async function login(req, res) {
    let { username, password } = req.body.dataForm
    try {
        if (!username || !password) return res.status(400).json({ message: 'Preencha todos os campos.' })
        username = username.toLowerCase()
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ message: 'Login ou senha inválidos!' })
        const userCompare = await comparePassword(password, user.password)
        if (!userCompare) return res.status(400).json({ message: 'Login ou senha inválidos!' })
        const token = await jwt.createToken(user._id)
        return res.status(200).json({ auth: true, message: 'Usuário conectado!', token, cnpj: user.cnpj, cnes: user.cnes, name: user.name })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro internno de servidor.' })
    }
}

async function createUser(req, res) {
    let { username, password, keyPass } = req.body.dataForm
    try {
        if (!username || !password || !keyPass) return res.status(400).json({ message: 'Preencha todos os campos' })
        username = username.toLowerCase()
        if (keyPass !== process.env.KEY_PASS) return res.status(400).json({ message: 'KeyPass inválida.' })
        const existUsername = await User.exists({ username })
        if (existUsername) return res.status(400).json({ message: 'Este usuário já está sendo utilizado.' })
        const hashedPassword = await hashPassword(password)
        const createUser = await User.create({ username, password: hashedPassword })
        return res.status(201).json({ message: 'Usuários criado com sucesso!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro interno de servidor' })
    }
}

async function editUser(req, res) { // ! vou ver se uso ainda
    const { _id, hired, cnes, provider } = req.body.dataForm
    let updateUser
    try {
        if (!_id) return res.status(404).json({ message: 'Usuário não encontrado.' })
        if (provider) updateUser = await User.findByIdAndUpdate({ _id }, { hired, cnes, provider })
        else updateUser = await User.findByIdAndUpdate({ _id }, { hired, cnes })

        return res.status(200).json({ message: 'Usuário atualizado com sucesso!' })

    } catch (error) {
        return res.status(500).json({ message: 'Erro interno de servidor.' })
    }
}


// Get
async function getPlans(req, res) {  // Busca todos os "planos" no DataBase
    const userId = req.userId
    try {
        let plans = await Planos.find({ userId }).sort({ name: 1 })
        return res.status(200).json(plans)
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar planos!' });
    }
}

async function getTerms(req, res) {
    const userId = req.userId
    try {
        const terms = await Docs.find({ userId }).sort({ name: 1 })
        return res.status(200).json(terms)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao buscar ramais' });
    }
}

async function getRamais(req, res) {
    const userId = req.userId
    try {
        const getRamais = await Ramais.find({ userId }).sort({ setor: 1 })
        return res.status(200).json(getRamais)
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar ramais' });
    }
}

async function getSites(req, res) {
    const userId = req.userId
    try {
        const getSites = await Sites.find({ userId }).sort({ name: 1 })
        return res.status(200).json(getSites)
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!" })
    }
}

async function getDoctor(req, res) {
    const userId = req.userId
    try {
        const getDoctor = await Doctor.find({ userId }).sort({ name: 1 })
        return res.status(200).json(getDoctor)
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!" })
    }
}

// Create
async function createPlan(req, res) {
    let { name, login, password, web, data } = req.body.dataForm
    const userId = req.userId
    const create = new Date()
    const update = create
    try {
        if (!name || name.trim() === '' || !userId) return res.status(400).json({ message: 'Forneça ao menos um nome.' })
        name = name.toLowerCase()
        const newPlan = await Planos.create({ userId, name, login, password, web, data, create, update })
        return res.status(201).json({ message: "Plano criado com sucesso" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocorreu algum erro no servidor:" })
    }
}

async function createTerm(req, res) {
    let { name, category, src, srcToken } = req.body.dataForm
    const userId = req.userId
    try {
        if (!name || !category || !src || !srcToken) return res.status(400).json({ message: 'Preencha todos os campos.' })
        name = name.toLowerCase()
        let create = new Date()
        let update = create
        const createDocs = await Docs.create({ userId, name, srcToken, src, category, create, update })
        return res.status(201).json({ message: "Documento criado com sucesso!" })
    } catch (error) {
        console.log({ status: 500, message: "Ocorreu algum erro!", error })
        res.status(500).json({ status: 500, message: "Ocorreu algum erro!", error })
    }
}

async function createRamal(req, res) {
    let { setor, ramal } = req.body.dataForm
    const userId = req.userId
    setor = setor.toLowerCase()
    let create = new Date()
    let update = create
    try {
        const newRamal = await Ramais.create({ userId, setor, ramal, create, update })
        return res.status(201).json({ message: "Contato criado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ message: "Erro interno de sevidor." })
    }
}

async function createSite(req, res) {
    let { name, web, src } = req.body.dataForm
    const userId = req.userId
    const create = new Date()
    const update = create
    try {
        if (!name) return res.status(400).json({ message: 'Forneça ao menos um nome.' })
        name = name.toLowerCase()
        const newSite = await Sites.create({ userId, name, web, src, create, update })
        return res.status(201).json({ message: "Site criado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!" })
    }

}

async function createDoctor(req, res) {
    let { name, crm, cbo } = req.body.dataForm
    const userId = req.userId
    const create = new Date()
    const update = create
    try {
        if (!name) return res.status(400).json({ message: 'Forneça ao menos um nome.' })
        name = name.toLowerCase()
        const newDoctor = await Doctor.create({ userId, name, crm, cbo, create, update })
        return res.status(201).json({ message: "Médico criado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!" })
    }

}

// Update
async function updatePlan(req, res) {
    let { _id, name, login, password, web, data } = req.body.dataForm
    const userId = req.userId
    try {
        if (!name || name.trim() === '') return res.status(400).json({ message: 'Preencha um nome.' })
        if (!_id || !userId) return res.status(400).json({ message: 'Plano não encontrado.' })
        const update = new Date()
        name = name.toLowerCase()
        const PlanUpdate = await Planos.findOneAndUpdate({ _id: _id, userId }, { name, login, password, web, data, update })
        return res.status(201).send({ message: "Plano atualizado com sucesso!" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ocorreu algum erro ao atualizar o plano!' });
    }
}

async function updateTerm(req, res) {
    let { _id, name, category, src, srcToken } = req.body.dataForm
    const userId = req.userId
    try {
        if (!name || !category) return res.status(400).json({ message: 'Preencha todos os campos.' })
        name = name.toLowerCase()
        const update = new Date()
        const updateDocs = await Docs.findOneAndUpdate({ _id, userId }, { name, category, src, srcToken, update })

        return res.status(201).json({ message: "Documento atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!" });
    }
}

async function updateRamal(req, res) {
    let { _id, setor, ramal } = req.body.dataForm
    const userId = req.userId
    console.log(req.body.dataForm)
    const update = new Date()
    setor = setor.toLowerCase()
    try {
        const upRamal = await Ramais.findByIdAndUpdate({ _id, userId }, { setor, ramal, update })
        return res.status(201).json({ message: "Ramal atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!" })
    }
}

async function updadeSite(req, res) {
    let { _id, name, src, web } = req.body.dataForm
    const userId = req.userId
    const update = new Date()
    try {
        if (!name) return res.status(400).json({ message: 'Forneça ao menos um nome.' })
        name = name.toLowerCase()
        const updadeSite = await Sites.findByIdAndUpdate({ _id, userId }, { name, web, src, update })
        return res.status(200).json({ message: "Site atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!" })
    }
}

async function updateDoctor(req, res) {
    let { _id, name, crm, cbo } = req.body.dataForm
    const userId = req.userId
    const update = new Date()
    try {
        if (!name) return res.status(400).json({ message: 'Forneça ao menos um nome.' })
        name = name.toLowerCase()
        const updateDoctor = await Doctor.findByIdAndUpdate({ _id, userId }, { name, crm, cbo })
        return res.status(200).json({ message: "Médico atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!" })
    }
}


// Delete
async function deleteIten(req, res) {
    const { exType, _id } = req.body
    const userId = req.userId
    try {
        if (!_id || !exType) return res.status(400).json({ message: 'Elemento não encontrado.' })
        else if (exType === 'plan') await Planos.findByIdAndDelete({ _id, userId })
        else if (exType === 'term') await Docs.findByIdAndDelete({ _id, userId })
        else if (exType === 'ramal') await Ramais.findByIdAndDelete({ _id, userId })
        else if (exType === 'site') await Sites.findByIdAndDelete({ _id, userId })
        else if (exType === 'doctor') await Doctor.findByIdAndDelete({ _id, userId })
        else return res.status(400).json({ message: 'Elemento não encontrado.' })
        return res.status(200).json({ message: 'Elemento excluído com sucesso!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro interno de servidor.' })
    }
}



module.exports = { login, createUser, editUser, getPlans, getTerms, getRamais, getSites, getDoctor, createPlan, createTerm, createRamal, createSite, createDoctor, updatePlan, updateTerm, updateRamal, updadeSite, updateDoctor, deleteIten }