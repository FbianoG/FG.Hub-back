const mongoose = require('mongoose')

async function connectDataBase() {
    try {
        await mongoose.connect("mongodb+srv://zeus:zeus123@cluster0.3pehwxh.mongodb.net/?retryWrites=true&w=majority")
        console.log('DataBase conectado');
    } catch (error) {
        console.error({ message: error })
    }
}

module.exports = { connectDataBase }
