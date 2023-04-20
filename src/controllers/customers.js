const CustomersModel = require('../models/customers')//importando o model criado
const { crypto } = require('../utils/password')

const defaultTitle = {
    pageRegister: 'Cadastrar Cliente',
    pageEdit: 'Editar Usuário'
}

function index(req, res){
    const { c } = req.query
    res.render('register', {
        title: defaultTitle.pageRegister
    })
}

async function add(req, res){
    const {
        name,
        age,
        email, 
        password,
    } = req.body//os campos e dados coletados nos inputs vem no body do req, é importantíssimo que os nomes das variáveis aqui estejam de acordo com os nomes dos campos input

    const passwordCrypto = await crypto(password)

    const register = new CustomersModel({//instanciando o novo registro no model, passando as valores capturados no req.body
        name,
        age,
        email,
        password: passwordCrypto,
    })

    register.save()

    res.render('register', {
        title: defaultTitle.pageRegister,
        message: 'Cadastro realizado com sucesso!'
    })
}

async function list(req, res){
    const users = await CustomersModel.find()

    res.render('list', {
        title: defaultTitle.pageEdit,
        users
    })
}

async function formEdit(req, res){
    const { id } = req.query//capturando o id passado na url do list.ejs

    
    const user = await CustomersModel.findById(id)//procurando usuário pelo id
    
    res.render('edit', {//renderizando o formulário de edição
        title: 'Editar Usuário',
        user
    })
}

async function edit(req, res){
    const {
        name,
        age,
        email, 
    } = req.body

    const { id } = req.params//aqui estou capturando o valor do id que mandei lá no index controller router.post('/edit/:id', CustomersController.edit)

    const user = await CustomersModel.findById(id)//procurando o usuário pelo id

    user.name = name //atribuindo os novos valores de inputs para o banco de dados
    user.age = age
    user.email = email

    user.save()

    res.render('edit', {
        title: defaultTitle.pageEdit,
        user,
        message: "Usuário alterado com sucesso!"
    })


}

async function remove(req, res){
    const { id } = req.params

    const remove = await CustomersModel.deleteOne({_id: id})

    if(remove.ok){
        res.redirect('list')
    }
}

module.exports = {
    add,
    index,
    list,
    formEdit,
    edit,
    remove
}