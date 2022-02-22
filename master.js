const express = require("express")
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require("./models/Post")

const app = express()


// Config
    // Template Engine
    const hbs = exphbs.create({
        defaultLayout:'main'
    })
        app.engine('handlebars', hbs.engine)
        app.set('view engine', 'handlebars') 

    // BodyParser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
        
    


app.get("/", function(req, res) {
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('home', {posts: posts})
    }) // Post.findAll traz um array de posts da tabela posts do banco
    
})

app.get("/cad", function(req, res) {
    res.render("form")
})

// justamente por estar utilizando o método de envio post
app.post("/add", function(req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function() {
        res.redirect("/")
        }).catch(function(err) {
            res.send("Houve um erro ao criar o post" + err)
    })
})

    app.get('/deletar/:id', function(req, res) {
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.send("Postagem deletada com Sucesso!")
        }).catch(function(err) {
            res.send("Esta postagem não existe!")
        })
    })

app.listen(8081, function() {
    console.log("Servidor Rodando!")
})