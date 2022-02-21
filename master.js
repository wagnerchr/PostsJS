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
    res.render('form')
})

// justamente por estar utilizando o método de envio post
app.post("/add", function(req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function() {
        res.send("Post criado com sucesso!")
        }).catch(function(err) {
            res.send("Houve um erro ao criar o post" + err)
    })
})

app.listen(8081, function() {
    console.log("Servidor Rodando!")
})