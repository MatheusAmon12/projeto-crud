const mongoose = require('mongoose')

//Essa parte refere-se ao Model do MVC
const schema = new mongoose.Schema({//criando uma nova instância, definindo os tipos de dados de cada campo
    name: String,
    age: Number,
    email: String,
    password: String,
})

const Model = mongoose.model('customers', schema)//passando para o mongoose o nome da colection e o schema definido acima.

module.exports = Model