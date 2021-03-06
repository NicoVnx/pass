const express = require("express")
const views = __dirname + "/views/"

require('./routes')
const admin = express.Router()

const mongoose = require("mongoose")

require('./models/Pedido')
const Pedido = mongoose.model('pedidos')

require('./models/Suporte')
const Suporte = mongoose.model('suportes')

var user = "rogerio"
var password = '123321'

var erros = []

var erro = "* Usuário ou senha incorretos"

admin.get("/", (req, res) => {

const status = ""
    var userS = req.session.user
    res.render(views + "admin/login", {userS, status})

})

admin.post("/home", (req, res) => {

    var userS = req.session.user

    if(req.body.user == user && req.body.password == password){
        const status = ""
        req.session.user = user
        res.render(views + "admin/home", {userS, status})
        
    }else{
        const status = erro || 500
        console.log(status)
        res.render(views + 'admin/login', {userS, status})

    }
})

admin.get('/home', (req, res) => {
    
    if(req.session.user){

        var userS = req.session.user
        res.render(views + "admin/home", {userS})

    }else{

        res.send('Faça o login como administrador para continuar!')

    }

})

admin.get('/logout', (req,res) => {

    req.session.destroy(function (err) {
    res.redirect('/admin/')})
  
})

admin.get("/suportes", (req, res) => {

    Suporte.find().then(function (suportes){

        res.render(views + "admin/suportes", {suportes: suportes})

    }).catch((err) => {

        console.log('houve um erro' + err)

    })

})

admin.get("/pedidos", (req, res) => {

    Pedido.find().then(function (pedidos){

        res.render(views + "admin/pedidos", {pedidos: pedidos})

    }).catch((err) => {

        console.log('houve um erro' + err)

    })

})

admin.get('/editar/:id', (req, res) => {

        Pedido.findOne({_id:req.params.id}).then((pedido)=>{

            res.render(views + "admin/editar", {pedido: pedido})

        }).catch((err) => {

            console.log('Pedido não existe')
            res.send('Pedido não existe')

        })
    
})

admin.post('/editar/', (req,res) => {

    if(erros.length >= 1){
    
        for(var i = 0; i = erros.length; i++){
          erros.shift()

    }}
    
    Pedido.findOne({cpf:req.body.cpf}).then((pedido) => {

        if(!req.body.nomeCompleto || typeof req.body.nomeCompleto == undefined || req.body.nomeCompleto == null)
        {erros.push({texto: "Nome inválido"})}
        else if(req.body.nomeCompleto.length < 4) {erros.push({texto: "Nome muito curto, mínimo de 4 dígitos"})}
        else if(req.body.nomeCompleto.length > 30) {erros.push({texto: "Nome muito longo, máximo de 30 dígitos"})}

        if(!req.body.cep || typeof req.body.cep == undefined || req.body.cep == null) {erros.push({texto: "CEP inválido"})}
        else if(req.body.cep.length < 8) {erros.push({texto: "CEP inválido"})}

        if(!req.body.estado || typeof req.body.estado == undefined || req.body.estado == null) {erros.push({texto: "Estado inválido"})}

        if(!req.body.cidade || typeof req.body.cidade == undefined || req.body.cidade == null) {erros.push({texto: "Cidade inválida"})}

        if(!req.body.bairro || typeof req.body.bairro == undefined || req.body.bairro == null) {erros.push({texto: "Bairro inválido"})}

        if(!req.body.rua || typeof req.body.rua == undefined || req.body.rua == null) {erros.push({texto: "Rua inválida"})}

        if(!req.body.numero || typeof req.body.numero == undefined || req.body.numero == null || req.body.numero <= 0) {erros.push({texto: "Numero inválido"})}
        
        if(erros.length > 0 ){

            sucesso = 1
            res.send(erros)
            console.log(erros)


        }else(

            sucesso = 2,

            pedido.nomeCompleto = req.body.nomeCompleto,
            pedido.cep = req.body.cep,
            pedido.estado = req.body.estado,
            pedido.cidade = req.body.cidade,
            pedido.bairro = req.body.bairro,
            pedido.rua = req.body.rua,
            pedido.numero = req.body.numero,
            pedido.check = req.body.check,

            pedido.save().then(() =>{ 

                res.send('Pedido Editado com sucesso!')

            }).catch((err) =>{

                sucesso = 1
                res.send('Erro interno ao editar pedido' + err)
                
            }))
        
        
    }).catch((err) => {

        res.send('Erro ao editar pedido' + err)

    })

})

module.exports = admin;
