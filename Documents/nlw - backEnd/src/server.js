const express = require("express")
const server = express()

//configurar as pastas public
server.use(express.static("public"))

//configurar o nunjucks
//usando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar os caminhos da minha aplicação
// pag inicial
// req: requisição
//res: resposta
server.get("/",(req,res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search-results", (req,res) => {
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000) // ouvir o que acontece na porta

