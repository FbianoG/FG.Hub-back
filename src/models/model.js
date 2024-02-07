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
    category: String,
    create: Date,
    update: Date,
})


module.exports = {
    Planos,
    Docs,
}