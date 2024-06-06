const mongoose = require('mongoose')



const Planos = mongoose.model('planos', {
    name: { type: String, unique: true, required: true },
    login: String,
    password: String,
    web: String,
    data: {
        cod: String,
        tel: String,
        email: String,
        att: String,
        guia: String,
        senha: String,
        obs: String,
    },
    create: Date,
    update: Date,
    active: Boolean,
})


const Docs = mongoose.model('docs', {
    name: { type: String, unique: true, required: true },
    src: { type: String, unique: true, required: true },
    srcToken: { type: String, unique: true, required: true },
    category: String,
    create: Date,
    update: Date,
})

const Ramais = mongoose.model('ramais', {
    setor: { type: String, unique: true },
    ramal: { type: String, unique: true },
    create: Date,
    update: Date,
})

const Sites = mongoose.model('sites', {
    name: { type: String, unique: true },
    web: { type: String, unique: true },
    src: String,
    create: Date,
    update: Date,
})

const User = mongoose.model('user', {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})


module.exports = {
    Planos,
    Docs,
    Ramais,
    Sites,
    User,
}