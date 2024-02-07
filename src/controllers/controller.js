const { Planos, Docs, Ramais } = require("../models/model")
const path = require('path');
const fs = require('fs')





// GET

async function getPlans(req, res) {  // Busca todos os "planos" no DataBase
    try {
        let plans = await Planos.find({})
        if (plans.length == 0) {
            return res.status(200).json({ message: "Não há planos cadastrados no DataBase!" })
        }
        return res.status(200).json(plans)
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar planos!' });
    }
}

async function getDocs(req, res) {
    try {
        let docs = await Docs.find({})
        // console.log(req.headers.Authorization)
        // console.log(req.userId)
        return res.json(docs)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao buscar ramais' });
    }
}

async function getRamais(req, res) {
    try {
        const getRamais = await Ramais.find({})
        return res.status(200).json(getRamais)
    } catch (error) {

    }
}




// POST

async function createPlan(req, res) {
    let { name, login, password } = req.body
    name = name.toLowerCase()
    const create = new Date()
    const update = create
    const active = false
    try {
        const newPlan = await Planos.create({ create, active, name, login, password, update, web: "", data: { cod: "", tel: "", email: "", att: "", guia: "", senha: "", obs: "" } })
        return res.status(201).json({ message: "Plano criado com sucesso", newPlan })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Ocorreu algum erro no servidor:" })
    }
}

async function updatePlan(req, res) {
    try {
        let activeStatus = req.body.active
        if (activeStatus == "0") {
            activeStatus = false
        } else {
            activeStatus = true
        }
        const update = new Date()
        let { _id, name, login, password, web, cod, tel, email, att, guia, senha, obs } = req.body
        name = name.toLowerCase()
        const PlanUpdate = await Planos.findOneAndUpdate({ _id: _id }, {
            name, login, password, web, data: { cod, tel, email, att, guia, senha, obs, }, update, active: activeStatus,
        })
        console.log(PlanUpdate)
        return res.status(204).send({ Message: "Plano atualizado com sucesso!" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ocorreu algum erro ao atualizar o plano!' });
    }
}



async function createDoc(req, res) {
    try {
        let { name, category } = req.body
        const file = req.file
        if (!file || !name || !category) {
            // por causa do "Multer" o file é salvo na pasta antes, 
            const filePath = path.join(`C:/Users/boris/OneDrive/Área de Trabalho/Programação/Project Olimpus/public/pdf/${file.filename}`) // localizar arquivo na pasta
            fs.unlinkSync(filePath) // Excluir arquivo da pasta
            return res.status(222).json({ message: "Todos os campos são obrigatórios!" })
        }
        name = name.toLowerCase()
        let create = new Date()
        let update = create
        const createDocs = await Docs.create({ name, src: file.filename, category, create, update })
        return res.status(201).json({ Message: "Arquivo criado com sucesso!" })
    } catch (error) {
        console.log({ status: 500, message: "Ocorreu algum erro!", error })
        res.status(500).json({ status: 500, message: "Ocorreu algum erro!", error })
    }
}

async function updateDoc(req, res) { // Atualiza "Documento" no DataBase
    try {
        let { _id, name, category } = req.body
        if (!_id || !name || !category) {
            return res.status(400).json({ message: "Preencha todos os campos do 'Formulário de Atualização'" })
        }
        name = name.toLowerCase()
        const update = new Date()
        const file = req.file
        const originalDoc = await Docs.findOne({ _id }) // localizar o documento no DataBase
        const lastSrc = originalDoc.src // Extrair nome do pdf salvo no "Documento"
        if (file) {
            // excluir pdf  usando "FS"
            const filePath = path.join(`C:/Users/boris/OneDrive/Área de Trabalho/Programação/Project Olimpus/public/pdf/${lastSrc}`) // localizar arquivo na pasta
            try {
                fs.unlinkSync(filePath) // Excluir arquivo da pasta
                console.log(`Arquivo anterior (${lastSrc}) excluído com sucesso.`)
            } catch (prosseguir) { }
            const updateDocs = await Docs.findOneAndUpdate({ _id }, { name, category, src: file.filename, update })
            return res.status(204).json({ Message: "Documento atualizado com sucesso!" })
        } else {
            let updateDocs = await Docs.findOneAndUpdate({ _id }, { name, category, update })
            return res.status(204).json({ Message: "Documento atualizado com sucesso!" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Ocorreu algum erro!" });
    }
}




module.exports = {
    createPlan,
    getPlans,
    updatePlan,

    createDoc,
    getDocs,
    updateDoc,
}