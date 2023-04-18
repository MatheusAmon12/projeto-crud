const mongoose = require('mongoose')

function connect(){
    //conectando ao MongoDB
    mongoose.connect('mongodb://127.0.0.1/projeto-crud')
    
    const db = mongoose.connection
    
    //uma vez que conectado exibe a mensagem
    db.once('open', () => {
        console.log('Connected to database!')
    })
    
    //quando der erro exibe o erro
    db.on('error', console.error.bind(console, 'connection error: '))
}

module.exports = {
    connect
}