const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

mongoose.connect('mongodb://127.0.0.1/')

const db = mongoose.connection

db.once('open', () => {
    console.log('Connected to database!')
})

db.on('error', console.error.bind(console, 'connection error: '))

//definindo template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))//alterando caminho da pasta views

//definindo arquivos públicos
app.use(express.static(path.join(__dirname, 'public')))

//habilitando server para receber dados via post (form)
app.use(express.urlencoded({extended: true}))

//rotas
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Titulo de teste'
    })
})

//error 404 - not found
app.use((req, res) => {//middleware
    res.send('Página não encontrada')
})

//executando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))