const mongoose = require('mongoose')



const Planos = mongoose.model('planos', {
    userId: { type: String, required: true },
    name: { type: String, required: true },
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
    userId: { type: String, required: true },
    name: { type: String, required: true },
    src: { type: String, required: true },
    srcToken: { type: String, required: true },
    category: String,
    create: Date,
    update: Date,
})

const Ramais = mongoose.model('ramais', {
    userId: { type: String, required: true },
    setor: { type: String, required: true },
    ramal: { type: String, required: true },
    create: Date,
    update: Date,
})

const Sites = mongoose.model('sites', {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    web: { type: String, required: true },
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