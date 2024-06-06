const { Planos, Docs, Ramais, Sites, User } = require("../models/model")
const jwt = require('../middlewares/jwt')


// GET

async function login(req, res) {
    let { username, password } = req.body.dataForm
    try {
        if (!username || !password) return res.status(400).json({ message: 'Preencha todos os campos.' })
        const user = await User.findOne({ username, password })
        if (!user) return res.status(400).json({ message: 'Login ou senha inválidos!' })
        const token = await jwt.createToken(user._id)
        return res.status(200).json({ message: 'Usuário conectado!', token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Erro internno de servidor.' })
    }
}

async function getPlans(req, res) {  // Busca todos os "planos" no DataBase
    try {
        let plans = await Planos.find().sort({ name: 1 })
        return res.status(200).json(plans)
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar planos!' });
    }
}

async function getTerms(req, res) {
    try {
        const terms = await Docs.find({}).sort({ name: 1 })
        return res.status(200).json(terms)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao buscar ramais' });
    }
}

async function getRamais(req, res) {
    try {
        const getRamais = await Ramais.find({}).sort({ setor: 1 })
        return res.status(200).json(getRamais)
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar ramais' });
    }
}

async function getSites(req, res) {
    try {
        const getSites = await Sites.find({}).sort({ name: 1 })
        return res.status(200).json(getSites)
    } catch (error) {
        return res.status(500).json({ Message: "Ocorreu algum erro!" })
    }
}



// POST

async function createPlan(req, res) {
    let { name, login, password, web, data } = req.body.dataForm
    const create = new Date()
    const update = create
    try {
        if (!name) return res.status(400).json({ message: 'Forneça ao menos um nome.' })
        name = name.toLowerCase()
        const newPlan = await Planos.create({ name, login, password, web, data, create, update })
        return res.status(201).json({ message: "Plano criado com sucesso" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocorreu algum erro no servidor:" })
    }
}

async function updatePlan(req, res) {
    try {
        const update = new Date()
        let { _id, name, login, password, web, data } = req.body.dataForm
        if (!_id) return res.status(400).json({ message: 'Plano não encontrado.' })
        name = name.toLowerCase()
        const PlanUpdate = await Planos.findOneAndUpdate({ _id: _id }, { name, login, password, web, data, update })
        return res.status(204).send({ Message: "Plano atualizado com sucesso!" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ocorreu algum erro ao atualizar o plano!' });
    }
}




async function createTerm(req, res) {
    let { name, category, src, srcToken } = req.body.dataForm
    console.log(req.body.dataForm)
    try {
        if (!name || !category || !src || !srcToken) return res.status(400).json({ message: 'Preencha todos os campos.' })
        name = name.toLowerCase()
        let create = new Date()
        let update = create
        const createDocs = await Docs.create({ name, srcToken, src, category, create, update })
        return res.status(201).json({ Message: "Documento criado com sucesso!" })
    } catch (error) {
        console.log({ status: 500, message: "Ocorreu algum erro!", error })
        res.status(500).json({ status: 500, message: "Ocorreu algum erro!", error })
    }
}

async function updateTerm(req, res) { // Atualiza "Documento" no DataBase
    let { _id, name, category, src, srcToken } = req.body.dataForm
    try {
        if (!name || !category) return res.status(400).json({ message: 'Preencha todos os campos.' })
        name = name.toLowerCase()
        const update = new Date()
        const updateDocs = await Docs.findOneAndUpdate({ _id }, { name, category, src, srcToken, update })
        return res.status(204).json({ Message: "Documento atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!" });
    }
}


async function createRamal(req, res) {
    let { setor, ramal } = req.body.dataForm
    setor = setor.toLowerCase()
    let create = new Date()
    let update = create
    try {
        const newRamal = await Ramais.create({ setor, ramal, create, update })
        return res.status(201).json({ Message: "Contato criado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ Message: "Erro interno de sevidor." })
    }
}

async function updateRamal(req, res) {
    let { _id, setor, ramal } = req.body.dataForm
    const update = new Date()
    setor = setor.toLowerCase()
    try {
        const upRamal = await Ramais.findByIdAndUpdate({ _id }, { setor, ramal, update })
        return res.status(201).json({ Message: "Ramal atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ Message: "Ocorreu algum erro!" })
    }
}


async function createSite(req, res) {
    let { name, web, src } = req.body.dataForm
    const create = new Date()
    const update = create
    try {
        if (!name) return res.status(400).json({ message: 'Forneça ao menos um nome.' })
        name = name.toLowerCase()
        const newSite = await Sites.create({ name, web, src, create, update })
        return res.status(201).json({ Message: "Site criado com sucesso!", Data: newSite })
    } catch (error) {
        return res.status(500).json({ Message: "Ocorreu algum erro!" })
    }

}

async function updadeSite(req, res) {
    let { _id, name, src, web } = req.body.dataForm
    const update = new Date()
    try {
        if (!name) return res.status(400).json({ message: 'Forneça ao menos um nome.' })
        name = name.toLowerCase()
        const updadeSite = await Sites.findByIdAndUpdate({ _id }, { name, web, src, update })
        return res.status(200).json({ Message: "Site atualizado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ Message: "Ocorreu algum erro!" })
    }
}


async function deleteIten(req, res) {
    const { exType, _id } = req.body
    try {
        if (!_id || !exType) return res.status(400).json({ message: 'Elemento não encontrado.' })
        else if (exType === 'plan') await Planos.findByIdAndDelete({ _id })
        else if (exType === 'term') await Docs.findByIdAndDelete({ _id })
        else if (exType === 'ramal') await Ramais.findByIdAndDelete({ _id })
        else if (exType === 'site') await Sites.findByIdAndDelete({ _id })
        else return res.status(400).json({ message: 'Elemento não encontrado.' })
        return res.status(200).json({ message: 'Elemento excluído com sucesso!' })
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno de servidor.' })
    }
}



module.exports = {
    createPlan,
    getPlans,
    updatePlan,


    deleteIten,


    createTerm,
    getTerms,
    updateTerm,

    createRamal,
    getRamais,
    updateRamal,

    getSites,
    createSite,
    updadeSite,

    login,


}